import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
import { QUESTION_SKELETON, CRITERION_SKELETON } from '../constants/models';


export  function getItemByAttrib(arr, attrib, value) {
    for (let  i in arr) {
        if (arr[i][attrib]===value) {
            return arr[i];
        }
    }
}
export function parseInitialData(responseData) {
    let { data } = responseData;
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
                }
            }
        }
    };
}
export function parseDataFromFetchTemplate(d) {
    let normalizedData = normalize(d, { endpoint:'evaluation-templates' });
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
        criteria.isMaximised =false;
        includeCriteria.relationships.questions.data.forEach((questionItem) => {
            let includedQuestion = included.filter((include) => {
                if ((include.type==='evaluation-questions')&&(include.id===questionItem.id)) {
                    return include;
                }
            });
            includedQuestion = includedQuestion[0];
            let question = createQuestion(Number(includedQuestion.relationships.type.data.id));
            let { attributes } = includedQuestion;
            question.id = includedQuestion.id;
            question.title = attributes.text;
            question.isAllowScaleDefinitions = Boolean(attributes.enable_scale_definitions);
            question.isAllowUpload = Boolean(attributes.allow_documents);
            question.isCommentRequired = Boolean(attributes.mandatory_comments);
            question.isMaximised = false;
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

            let evaluationQuestion = build(normalizedData, 'evaluationQuestions', question.id);

            let typeDefinitionByIndex = {};

            // convert object to array.
            evaluationQuestion.type.definitions.forEach((definition) => {
                typeDefinitionByIndex[definition.id] = definition;
            });

            if (evaluationQuestion.definitions) {
                evaluationQuestion.definitions.forEach((def) => {

                    let typeDefinitionId = def.typeDefinition.id;
                    let typeDef = typeDefinitionByIndex[typeDefinitionId];
                    if (typeDef) {
                        let { score, definition, id }  = def;
                        let definitionId = id;
                        let label = definition;
                        let newScaleDefinition = { id:typeDef.id, label, value:typeDef.value, score, definitionId };
                        typeDefinitionByIndex[typeDefinitionId] = newScaleDefinition;
                    }
                });
            }
            question.scaleDefinitions = Object.values(typeDefinitionByIndex);
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
    let normalizedObject = normalize(response, { endpoint:'evaluation-questions' });
    let evaluationQuestionData = build(normalizedObject, 'evaluationQuestions')[0];
    let { id, text, enableScaleDefinitions, mandatoryComments, allowDocuments, documents, type, definitions } = evaluationQuestionData;
    let question = createQuestion();
    question.id = id;
    question.title = text;
    question.type = type.id;
    question.isAllowScaleDefinitions = Boolean(enableScaleDefinitions);
    question.isCommentRequired = Boolean(mandatoryComments);
    question.isAllowUpload = Boolean(allowDocuments);
    question.documentIds = documents?documents.map(document => document.id):[];

    let typeDefinitionByIndex = {};
    type.definitions.forEach((item) => {
        typeDefinitionByIndex[item.id] =item;
    });
    if (definitions) {
        definitions.forEach((item) => {
            let typeDefinition = typeDefinitionByIndex[item.typeDefinition.id];
            if (typeDefinition) {
                let { score, definition, id }  = item;
                let definitionId = id;
                let label = definition;
                let newScaleDefinition = { ...typeDefinition, score, definitionId, label };
                typeDefinitionByIndex[item.typeDefinition.id] = newScaleDefinition;
            }
        });
    }
    question.scaleDefinitions = Object.values(typeDefinitionByIndex);

    return  question;
}

export function parseDataForScaleDefinition(typeDefinitionId, scaleDefinitionId, definition, score) {
    score = String(score);
    let data = {
        type: 'evaluation-question-scale-definitions',
        attributes: {
            definition
        }
    };
    if (scaleDefinitionId===undefined) {
        data.attributes.score = score;
        data.relationships = {
            typeDefinition: {
                data: {
                    type: 'evaluation-question-type-definitions',
                    id: typeDefinitionId
                }
            }
        };
    } else {
        data.id= scaleDefinitionId;
    }
    return { data };
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
export function createCriterionFromData(responseData) {
    let { data } = responseData;
    return Object.assign(createCriteria(), { id:data.id, title: data.attributes.title, weight: data.attributes.weight });
}
