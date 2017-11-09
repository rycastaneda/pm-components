import { } from '../constants/ActionTypes';
import axios from 'axios';
import { parseDataForCreateTemplate,
    parseDataForUpdateTemplate
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
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

const TEMPLATE_SERVICE_URL = 'evaluation-templates';

export function addTemplate(title) {
    return (dispatch) => {
        return axios.post(TEMPLATE_SERVICE_URL, parseDataForCreateTemplate(title))
        .then((response) => {
            const template = response.data.data;
            const title =
            dispatch({ type:TEMPLATE_CREATED, title: template.attributes.title, id:Number.parsetInt(template.id) });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateTemplate(title, id) {
    return (dispatch) => {
        return axios.post(TEMPLATE_SERVICE_URL/+id, parseDataForUpdateTemplate(title, id))
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function addCriteria(title, weighting) {
    return { type:CRITERIA_ADD, id:33, title, weighting };
}

export function deleteCriteria() {
    return { type:CRITERIA_DELETE };
}

export function updateCriteria(id, title, weighting) {
    return { type:CRITERIA_UPDATE, id, title, weighting };
}

export function addQuestionToCriteria() {
    return { type:QUESTION_ADD };
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
