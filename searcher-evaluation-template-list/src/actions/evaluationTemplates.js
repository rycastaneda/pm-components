import axios from 'axios';

import { getTemplateServiceUrlFor,
    getDataFromTemplateService,
    getDataForSave,
    getUsers,
    EVALUATION_SERVICE
} from '../utils/dataParserUtil';

import { INITIALIZED,
    EVALUATION_TEMPLATES_FETCHED,
    EVALUATION_TEMPLATE_UPDATED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

export function previewTemplate(id) {
    id;
}

export function changeTemplateStatus(id, active) {
    return  (dispatch) => {
        axios.patch(EVALUATION_SERVICE+'/'+id, getDataForSave(id, active))
        .then(() => {
            dispatch({ type: EVALUATION_TEMPLATE_UPDATED, id, active });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function initialize() {
    return (dispatch) => {
        axios.all([axios.get('staff'), axios.get(getTemplateServiceUrlFor())])
        .then((responses) => {
            const responseData = getDataFromTemplateService(responses[1].data);
            const users = getUsers(responses[0].data);
            let isBusy = false;
            let { templates, totalPages, currentPage } = responseData;
            dispatch({ type: INITIALIZED,
                users,
                templates,
                totalPages,
                currentPage,
                isBusy });
        });
    };
}

export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        const { filterKeyword, filterStatus, filterDate, filterUserId, perPage }= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(filterKeyword, filterStatus, filterDate, filterUserId, perPage, currPage), dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        const { filterKeyword, filterStatus, filterDate, filterUserId }= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(filterKeyword, filterStatus, filterDate, filterUserId, perPage, 1), dispatch);
    };
}

export function onEvaluationTemplatesFilterChange(keyword, status, date, userId) {
    return (dispatch, getState) => {
        const { maxRowLength, startIndex }= getState().evaluationTemplates;
        getPromiseForTemplateService(getTemplateServiceUrlFor(keyword, status, date, userId, maxRowLength, startIndex), dispatch);
    };
}

function getPromiseForTemplateService(url, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        const { templates, totalPages, currentPage }= getDataFromTemplateService(response.data);
        const isBusy = false;
        dispatch({
            type: EVALUATION_TEMPLATES_FETCHED,
            templates,
            totalPages,
            currentPage,
            isBusy
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
