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

export function parseDataFromCreateQuestion(data, evaluationTypeDefinitions) {
    let question = createQuestion();
    question.id = data.id;
    question.title = data.attributes.text;
    question.type =data.relationships.type.data.id;
    question.scaleDefinitions = evaluationTypeDefinitions.map((item) => {
        window.console.log(item);
        let { id, attributes }= item;
        let { value, title } = attributes;
        return { id, value, title };
    });

    return question;
}
export function parseDataForScaleDefinition(id, definition) {
    return {
        data: {
            type: 'evaluation-question-scale-definitions',
            id,
            attributes: {
                definition
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
