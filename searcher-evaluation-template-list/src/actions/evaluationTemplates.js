import { } from '../constants/ActionTypes';
import axios from 'axios';
import { getTemplateServiceUrlFor, getDataFromTemplateService } from '../utils/dataParserUtil';
import { EVALUATION_TEMPLATES_FETCHED, REQUEST_FAILED, IS_BUSY } from '../constants/ActionTypes';

export function deleteTemplate(id) {
    id;
}
export function previewTemplate(id) {
    id;
}

export function changeTemplateStatus(id) {
    id;
}
export function fetchEvaluationTemplates() {
    return (dispatch) => {
        getPromiseForService(getTemplateServiceUrlFor(), dispatch).then((response) => {
            const responseData= getDataFromTemplateService(response.data);
            window.console.log(responseData);
            dispatch({
                type:EVALUATION_TEMPLATES_FETCHED,
                evaluationTemplates:responseData.templates
            });
        });
    };
}
export function onEvaluationTemplatesPaginationChange(currPage) {
    return (getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForService(state.filterKeyword, state.filterStatus, state.filterDate, state.perPage, currPage);
    };
}
export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForService(state.filterKeyword, state.filterStatus, state.filterDate, perPage, 1).then((response) => {
            response;
            dispatch({
                type:EVALUATION_TEMPLATES_FETCHED,
                templates: [{ 'name':'werew', 'instances':2, 'completed':3, 'statusClass':'badge-success', 'statusName':'Active' }],
                perPage
            });
        });
    };
}

export function onEvaluationTemplatesFilterChange(keyword, status, date) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        getPromiseForService(getTemplateServiceUrlFor(keyword, status, date, state.maxRowLength, state.startIndex), dispatch).then((response) => {
            response;
            dispatch({
                type:EVALUATION_TEMPLATES_FETCHED,
                templates: [{ 'name':'werew', 'instances':2, 'completed':3, 'statusClass':'badge-success', 'statusName':'Active' }],
                keyword,
                status,
                date });
        });
    };
}

function getPromiseForService(url, dispatch) {

    return axios.get(url).catch((error) => {
        dispatch({ type:REQUEST_FAILED, message: error.message });
    });
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
