import { } from '../constants/ActionTypes';
import axios from 'axios';
// import { formatTemplatesFromFetchService } from '../utils/dataParserUtil';
import {
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    QUESTION_ADD,
    QUESTION_UPDATE,
    QUESTION_DELETE,
    TEMPLATE_FETCHED,
    REQUEST_FAILED,
    IS_BUSY
} from '../actions/evaluationTemplates';

const FETCH_TEMPLATE = 'template';

export function addCriteria() {
    return { type:CRITERIA_ADD };
}

export function deleteCriteria() {
    return { type:CRITERIA_DELETE };
}

export function updateCriteria() {
    return { type:CRITERIA_UPDATE };
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
        getPromiseForService(FETCH_TEMPLATE, dispatch)
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
