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
} from '../constants/ActionTypes';

const FETCH_TEMPLATE_URL = 'template';

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
        getPromiseForService(FETCH_TEMPLATE_URL, dispatch)
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
