import { QUESTION_SKELETON, CRITERION_SKELETON } from '../constants/models';

export  function getItemByAttrib(arr, attrib, value) {
    for (var i in arr) {
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
    let  id  = questionType.type;
    const enable_scale_definitions =  Number(questionType.maxOptionDefinitions !==0);
    return {
        data:{
            type: 'evaluation-questions',
            attributes: {
                text,
                enable_scale_definitions
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

export function parseDataFromCreateQuestion(data, typeId) {
    let question = createQuestion();
    question.id = data.id;
    question.title = data.attributes.text;
    question.typeId = data.relationships.type.data.id;
    question.type =typeId;
    return question;
}

export function createQuestion(type =0) {
    let question = deepClone(QUESTION_SKELETON);
    question.type= type;
    return question;
}
export function createCriteria() {
    return deepClone(CRITERION_SKELETON);
}
export function createCriterionFromData(data) {
    return Object.assign(createCriteria(), { id:data.id, title: data.attributes.title, weight: data.attributes.weight });
}
