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

import { MESSAGE_TYPE_ERROR } from '../notification/constants';
import { showNotification } from '../notification/actions';

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
            let { message } = error;
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
            dispatch({ type: REQUEST_FAILED });
        });
    };
}

export function initialize() {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        const { filterKeyword, filterStatus, filterDate, filterUserId, maxRowLength, currentPage }= getState().evaluationTemplates;
        const { dateTimeStart, dateTimeEnd, isDateRangeValid } = getState().pmDateRange;
        axios.all([
            axios.get('staff'),
            axios.get(getTemplateServiceUrlFor(filterKeyword, filterStatus, filterDate, filterUserId, maxRowLength, currentPage, isDateRangeValid, dateTimeEnd, dateTimeStart))
        ])
        .then((responses) => {
            window.console.log('response');
            const responseData = getDataFromTemplateService(responses[1].data);
            const users = getUsers(responses[0].data);
            let { templates, totalPages, currentPage } = responseData;
            dispatch({ type: INITIALIZED,
                users,
                templates,
                totalPages,
                currentPage });
        });
    };
}

export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        const { filterKeyword, filterStatus, filterDate, filterUserId, maxRowLength }= getState().evaluationTemplates;
        let queryParams = { filterKeyword, filterStatus, filterDate, filterUserId };
        getPromiseForTemplateService(getTemplateServiceUrlFor(filterKeyword, filterStatus, filterDate, filterUserId, maxRowLength, currPage), queryParams, dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        const { filterKeyword, filterStatus, filterDate, filterUserId }= getState().evaluationTemplates;
        let queryParams = { filterKeyword, filterStatus, filterDate, filterUserId };
        getPromiseForTemplateService(getTemplateServiceUrlFor(filterKeyword, filterStatus, filterDate, filterUserId, perPage, 1), queryParams, dispatch);
    };
}

export function onEvaluationTemplatesFilterChange(filterKeyword, filterStatus, filterDate, filterUserId) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        const { maxRowLength, startIndex }= getState().evaluationTemplates;
        const { dateTimeStart, dateTimeEnd, isDateRangeValid } = getState().pmDateRange;
        let queryParams = { filterKeyword, filterStatus, filterDate, filterUserId };

        getPromiseForTemplateService(
            getTemplateServiceUrlFor(
                filterKeyword,
                filterStatus,
                filterUserId,
                maxRowLength,
                startIndex,
                dateTimeEnd,
                isDateRangeValid,
                dateTimeStart
            ),
            queryParams,
            dispatch
        );
    };
}

function getPromiseForTemplateService(url, queryParams, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        const { templates, totalPages, currentPage, maxRowLength }= getDataFromTemplateService(response.data);
        dispatch({
            type: EVALUATION_TEMPLATES_FETCHED,
            queryParams,
            templates,
            totalPages,
            currentPage,
            maxRowLength
        });
    });
}

function getPromiseForService(url, dispatch) {
    return axios.get(url)
    .catch((error) => {
        let { message } = error;
        dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        dispatch({ type: REQUEST_FAILED });
    });
}
export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
