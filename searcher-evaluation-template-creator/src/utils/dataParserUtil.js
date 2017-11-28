import { QUESTION_SKELETON, CRITERION_SKELETON } from '../constants/models';

export function parseDefinitionsForSave(scaleDefinitions) {

    if (scaleDefinitions.length) {
        scaleDefinitions = scaleDefinitions.filter(item => item.label.length);
    }
    return scaleDefinitions;

}
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
    weight =Number(weight);
    return { data:{ type: 'evaluation-criteria', attributes: { title, weight } } };
}

export function parseDataForUpdateCriteria(id, title, weight) {
    weight =Number(weight);
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
export function parseDataFromFetchTemplate(data) {
    window.console.log(data);
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
export function createQuestion(type =0) {
    let question = deepClone(QUESTION_SKELETON);
    question.type = type;
    return question;
}
export function createCriteria() {
    return deepClone(CRITERION_SKELETON);
}
export function createCriterionFromData(data) {
    return Object.assign(createCriteria(), { id:data.id, title: data.attributes.title, weight: data.attributes.weight });
}
