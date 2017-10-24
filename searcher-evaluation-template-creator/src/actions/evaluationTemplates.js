import { } from '../constants/ActionTypes';
import axios from 'axios';
// import { formatTemplatesFromFetchService } from '../utils/dataParserUtil';
import { EVALUATION_TEMPLATES_FETCHED, REQUEST_FAILED, IS_BUSY } from '../actions/evaluationTemplates';

export function deleteTemplate(id) {
    id;
}
export function previewTemplate(id) {
    id;
}

export function changeTemplateStatus(id) {
    id;
}

export function onEvaluationTemplatesDisplayedLengthChange(length) {
    return (getState) => {
        const state= getState().evaluationTemplates;
        fetchEvaluationTemplatesFor(state.filterKeyword, state.filterStatus, state.filterDate, length, state.startIndex);
    };
}

export function onEvaluationTemplatesFilterChange(keyword, status, date) {
    return (dispatch, getState) => {
        const state= getState().evaluationTemplates;
        fetchEvaluationTemplatesFor(keyword, status, date, state.maxRowLength, state.startIndex, dispatch).then((response) => {
            response;
            dispatch({
                type:EVALUATION_TEMPLATES_FETCHED,
                templates: [{ 'name':'werew', 'instances':2, 'completed':3, 'statusClass':'badge-success', 'statusName':'Active' }],
                keyword,
                status,
                date,
                maxRowLength: state.maxRowLength,
                startIndex: state.startIndex });
        });
    };
}

function fetchEvaluationTemplatesFor(keyword, status, date, maxRowLength, startIndex, dispatch) {
    keyword;
    status; date; maxRowLength; startIndex;
    return axios.get('evaluationTemplates').catch((error) => {
        dispatch({ type:REQUEST_FAILED, message: error.message });
    });
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
