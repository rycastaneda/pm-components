import axios from 'axios';
import { getTemplateServiceUrlFor,
    getDataFromTemplateService,
    getDataForSave,
    EVALUATION_SERVICE
} from '../utils/dataParserUtil';
import { EVALUATION_TEMPLATES_FETCHED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

export function previewTemplate(id) {
    id;
}

export function changeTemplateStatus(id, status) {
    return  (dispatch) => {
        axios.patch(EVALUATION_SERVICE+'/'+id, getDataForSave(id, status))
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function fetchEvaluationTemplates() {
    return (dispatch) => {
        getPromiseForTemplateService(getTemplateServiceUrlFor(), dispatch);
    };
}

export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(state.filterKeyword, state.filterStatus, state.filterDate, state.perPage, currPage), dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(state.filterKeyword, state.filterStatus, state.filterDate, perPage, 1), dispatch);
    };
}

export function onEvaluationTemplatesFilterChange(keyword, status, date) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(keyword, status, date, state.maxRowLength, state.startIndex), dispatch);
    };
}

function getPromiseForTemplateService(url, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        const responseData= getDataFromTemplateService(response.data);
        dispatch({
            type: EVALUATION_TEMPLATES_FETCHED,
            evaluationTemplates: responseData.templates,
            totalPages: responseData.totalPages,
            currentPage: responseData.currentPage
        });
    });
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
