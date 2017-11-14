import { } from '../constants/ActionTypes';
import axios from 'axios';
import { parseDataForCreateTemplate,
    parseDataForUpdateTemplate,
    parseDataForCreateCriteria,
    parseDataForUpdateCriteria,
    parseDataForDeleteCriteria,
    parseDataForCreateQuestion,
    createCriterionFromData,
    parseDataFromCreateQuestion
} from '../utils/dataParserUtil';
import {
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    QUESTION_ADD,
    QUESTION_UPDATE,
    QUESTION_DELETE,
    TEMPLATE_FETCHED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

const TEMPLATE_SERVICE_URL = 'evaluation-templates';

export function addTemplate(title) {
    return (dispatch) => {
        return axios.post(TEMPLATE_SERVICE_URL, parseDataForCreateTemplate(title))
        .then((response) => {
            const template = response.data.data;
            dispatch({ type:TEMPLATE_CREATED, title: template.attributes.title, id:Number(template.id) });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateTemplate(title, id) {
    return (dispatch) => {
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+id, parseDataForUpdateTemplate(title, id))
        .then(() => {
            dispatch({ type:TEMPLATE_UPDATED, title });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function addCriteria(title, weight) {
    return (dispatch, getState) => {
        const id = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria', parseDataForCreateCriteria(title, weight))
        .then((response) => {
            dispatch({ type:CRITERIA_ADD, criterion: createCriterionFromData(response.data.data) });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function deleteCriteria(id) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id, parseDataForDeleteCriteria(id))
        .then(() => {
            dispatch({ type:CRITERIA_DELETE, id });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateCriteria(id, title, weight) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id, parseDataForUpdateCriteria(id, title, weight))
        .then(() => {
            dispatch({ type:CRITERIA_UPDATE, id, title, weight });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function addQuestionToCriteria(criteriaId, questionTitle, questionTypeId) {
    return (dispatch, getState) => {
        const id = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria/'+criteriaId+'/questions', parseDataForCreateQuestion(questionTitle, questionTypeId))
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data.data, questionTypeId) ;
            dispatch({ type:QUESTION_ADD, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateQuestionToCriteria() {
    return { type:QUESTION_UPDATE };
}

export function deleteQuestionFromCriteria() {
    return { type:QUESTION_DELETE };
}

export function fetchTemplate() {
    return (dispatch) => {
        getPromiseForService(TEMPLATE_SERVICE_URL, dispatch)
            .then((response) => {
                response;
                // let template = parseTemplateFromResponse(response.data);
                dispatch ({ type: TEMPLATE_FETCHED });
            });
    };
}

function getPromiseForService(url, dispatch) {
    return axios.get(url)
    .catch((error) => {
        dispatch({ type:REQUEST_FAILED, message: error.message });
    });
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
