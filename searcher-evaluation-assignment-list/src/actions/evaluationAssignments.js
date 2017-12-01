import {} from '../constants/ActionTypes';
import axios from 'axios';
import {
    getAssignmentServiceUrlFor,
    getDataFromAssignmentService
} from '../utils/dataParserUtil';
import {
    EVALUATION_ASSIGNMENTS_FETCHED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

export function deleteAssignment(id) {
    id;
}
export function previewAssignment(id) {
    id;
}

export function changeAssignmentStatus(id) {
    id;
}
export function initialize() {
    return (dispatch) => {
        axios.all([
            axios.get('/evaluation-templates?[active=1]'),
            axios.get('evaluation-templates/evaluation-template-assignment-types'),
            axios.get('/staff'),
            axios.get(),
            getPromiseForService(
                getAssignmentServiceUrlFor(),
                dispatch
            )
        ]).then(() => {

        });
    };
}
export function onEvaluationAssignmentsPaginationChange(currPage) {
    return (getState) => {
        const state = getState().evaluationAssignments;
        getPromiseForService(
            state.filterKeyword,
            state.filterStatus,
            state.filterDate,
            state.perPage,
            currPage
        );
    };
}
export function onEvaluationAssignmentsDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        const state = getState().evaluationAssignments;
        getPromiseForService(
            state.filterKeyword,
            state.filterStatus,
            state.filterDate,
            perPage,
            1
        ).then((response) => {
            response;
            dispatch({
                type: EVALUATION_ASSIGNMENTS_FETCHED,
                assignments: [
                    {
                        name: 'werew',
                        instances: 2,
                        completed: 3,
                        statusClass: 'badge-success',
                        statusName: 'Active'
                    }
                ],
                perPage
            });
        });
    };
}

export function onEvaluationAssignmentsFilterChange(keyword, status, date) {
    return (dispatch, getState) => {
        const state = getState().evaluationAssignments;
        getPromiseForService(
            getAssignmentServiceUrlFor(
                keyword,
                status,
                date,
                state.maxRowLength,
                state.startIndex
            ),
            dispatch
        ).then((response) => {
            response;
            dispatch({
                type: EVALUATION_ASSIGNMENTS_FETCHED,
                assignments: [
                    {
                        name: 'werew',
                        instances: 2,
                        completed: 3,
                        statusClass: 'badge-success',
                        statusName: 'Active'
                    }
                ],
                keyword,
                status,
                date
            });
        });
    };
}

function getPromiseForService(url, dispatch) {
    return axios.get(url).catch((error) => {
        dispatch({ type: REQUEST_FAILED, message: error.message });
    });
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
