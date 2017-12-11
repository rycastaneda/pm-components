import { QUESTION_SKELETON, CRITERION_SKELETON } from '../constants/models';


export  function getItemByAttrib(arr, attrib, value) {
    for (let  i in arr) {
        if (arr[i][attrib]===value) {
            return arr[i];
        }
    }
}
export function parseInitialData(data) {
    return  data.map((item) => {
        let  type = item.id;
        let { title } = item.attributes;
        let definitions = item.relationships.definitions.data;
        let maxOptionDefinitions = definitions.length;
        return { title, type, maxOptionDefinitions, definitions };
    });
}
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function parseDataForCreateTemplate(title) {
    return { data:{ type: 'evaluation-templates', attributes: { title } } };
}

export function parseDataForUpdateTemplate(title, id) {
    return { data:{ type: 'evaluation-templates', id,  attributes: { title } } };
}

export function parseDataForCreateCriteria(title, weight) {
    weight = Number(weight);
    return { data:{ type: 'evaluation-criteria', attributes: { title, weight } } };
}

export function parseDataForUpdateCriteria(id, title, weight) {
    weight = Number(weight);
    return { data:{ type: 'evaluation-criteria', id,  attributes: { title, weight } } };
}
export function parseDataForDeleteCriteria(id) {
    return { data:{ type: 'evaluation-criteria', id, attributes: { active:0 } } };
}
export function parseDataForCreateQuestion(text, questionType) {
    let  id  = questionType;
    return {
        data:{
            type: 'evaluation-questions',
            attributes: {
                text
            },
            relationships: {
                type:{
                    data:{
                        type:'evaluation-question-types',
                        id
                    }
                } }
        }
    };
}
export function parseDataFromFetchTemplate(d) {
    let { data, included }= d;
    let result= {};
    result.id = Number(data.id);
    let { attributes, relationships } = data;
    let allCriteriaIndexes =[];
    let criteriaByIndex={};
    let questionsByIndex = {};
    let allQuestionIndexes = [];
    let documentsByIndex = {};
    let allDocumentIndexes = [];
    relationships.criteria.data.forEach((crtieriaItem) => {

        allCriteriaIndexes.push(String(crtieriaItem.id));
        let includeCriteria = included.filter((include) => {
            return ((include.type==='evaluation-criteria')&&(include.id===crtieriaItem.id));
        });
        includeCriteria = includeCriteria[0];
        let criteria = createCriteria();
        criteria.id = crtieriaItem.id;
        criteria.title = includeCriteria.attributes.title;
        criteria.weight = includeCriteria.attributes.weight;

        includeCriteria.relationships.questions.data.forEach((questionItem) => {

            let includedQuestion = included.filter((include) => {
                if ((include.type==='evaluation-questions')&&(include.id===questionItem.id)) {
                    return include;
                }
            });

            includedQuestion =includedQuestion[0];

            let question = createQuestion(Number(includedQuestion.relationships.type.data.id));
            let { attributes } = includedQuestion;
            question.id = includedQuestion.id;
            question.title = attributes.text;
            question.isAllowScaleDefinitions = Boolean(attributes.enable_scale_definitions);
            question.isAllowUpload = Boolean(attributes.allow_documents);
            question.isCommentRequired = Boolean(attributes.mandatory_comments);
            question.isMaximised =false;
            question.documentIds=[];
            let includedDocuments =[];
            if (includedQuestion.relationships.documents) {
                includedDocuments = includedQuestion.relationships.documents.data.map((documentItem) => {


                    let includedDocument= included.filter((include) => {

                        return ((include.type==='uploads')&&(include.id===documentItem.id));
                    });
                    includedDocument = includedDocument[0];
                    let document ={};
                    includedDocument.id = includedDocument.id;
                    document.name = includedDocument.attributes.original_name;
                    document.status = 'success';
                    document.progress= 100;
                    document.id = includedDocument.id;
                    document.referenceId = includedDocument.id;
                    document.referenceUrl= includedDocument.attributes.download_url;

                    return document;
                });
            }
            includedDocuments.forEach((document) => {
                question.documentIds.push(document.id);
                documentsByIndex[String(document.id)] = document;
                allDocumentIndexes.push(document.id);
            });

            let includedTypeDefinitions = included.filter((include) => {
                return ((include.type==='evaluation-question-type-definitions'));
            });
            let includedDefinitions=[];
            if (includedQuestion.relationships.definitions) {

                includedDefinitions = includedQuestion.relationships.definitions.data.map((definitionItem) => {
                    let includedDefinition = included.filter((include) => {
                        return ((include.type==='evaluation-question-scale-definitions')&&(include.id===definitionItem.id));
                    });
                    return includedDefinition[0];
                });
            }
            includedTypeDefinitions.forEach((def) => {
                let definition = {};
                definition.value = Number(def.attributes.value);
                definition.title = String(def.attributes.title);
                definition.id = String(def.attributes.value);
                let includedDefinition = includedDefinitions.filter((def2) => {
                    return (Number(def2.attributes.score)===Number(def.attributes.value));
                });
                if (includedDefinition.length) {
                    includedDefinition = includedDefinition[0];
                    definition.label = includedDefinition.attributes.definition;
                    definition.refId = includedDefinition.id;

                } else {
                    definition.refId = null;
                    definition.label = '';
                }
                question.scaleDefinitions.push(definition);

            });
            questionsByIndex[question.id] = question;
            allQuestionIndexes.push(question.id);
            criteria.questions.push(question.id);
        });
        criteriaByIndex[crtieriaItem.id] = criteria;
    });
    result.title = attributes.title;
    result.published = Boolean(attributes.published);
    result.allCriteriaIndexes = allCriteriaIndexes;
    result.criteriaByIndex = criteriaByIndex;
    result.allQuestionIndexes = allQuestionIndexes;
    result.questionsByIndex = questionsByIndex;
    result.documentsByIndex = documentsByIndex;
    result.allDocumentIndexes = allDocumentIndexes;
    return result;
}
export function parseDataFromCreateQuestion(response) {
    let { data, included } = response;
    let question = createQuestion();
    let { attributes, relationships, id } = data;
    question.id = id;
    question.title = attributes.text;
    question.type = relationships.type.data.id;
    question.isAllowScaleDefinitions = Boolean(attributes.enable_scale_definitions);
    question.isCommentRequired = Boolean(attributes.mandatory_comments);
    question.isAllowUpload = Boolean(attributes.allow_documents);

    let evaluationTypeDefinitions = included.filter((item) => {
        return item.type === 'evaluation-question-type-definitions';
    });
    let evaluationScaleDefinitions = included.filter((item) => {
        return item.type === 'evaluation-question-scale-definitions';
    });


    question.scaleDefinitions = evaluationTypeDefinitions.map((item) => {
        let definition = evaluationScaleDefinitions.find((scaleDefinition) => {
            return Number(scaleDefinition.attributes.score) === Number(item.attributes.value);
        });
        let { id, attributes }= item;
        let { value, title } = attributes;
        if (definition) {

            return { id, value, title, label:definition.attributes.definition, refId:definition.id };

        } else {
            return { id, value, title, label:'', refId:null };
        }
    });
    return question;
}

export function parseDataForScaleDefinition(id, definition, score) {
    score = String(score);
    return {
        data: {
            type: 'evaluation-question-scale-definitions',
            id,
            attributes: {
                definition,
                score
            }
        }
    };
}
export function parseDataForUpdateQuestion(question) {
    return     {
        data: {
            type: 'evaluation-question',
            id: question.id,
            attributes: {
                text: question.title,
                allow_documents: Number(question.isAllowUpload),
                enable_scale_definitions: Number(question.isAllowScaleDefinitions),
                mandatory_comments: Number(question.isCommentRequired)
            },
            relationships:{
                type: {
                    data:{
                        type:'evaluation-question-types',
                        id:question.type
                    }
                }
            }
        }
    };
}
export function createQuestion(type ='1') {
    let question = deepClone(QUESTION_SKELETON);
    question.type = String(type);
    return question;
}
export function createCriteria() {
    return deepClone(CRITERION_SKELETON);
}
export function createCriterionFromData(data) {
    return Object.assign(createCriteria(), { id:data.id, title: data.attributes.title, weight: data.attributes.weight });
}
