import {
    ASSIGNMENT_CREATED,
    TEMPLATES_FETCHED,
    EVALUATION_ON_FETCHED,
    ASSIGNEES_FETCHED,
    SELECTED_ASSIGNEES_UPDATE,
    LINKED_TO_FETCHED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';
import { parseDataFromTemplatesService, parseDataFromAssigneeService } from '../utils/dataParser';
import axios from 'axios';

const SERVICE_URL_FRAGMENT = 'http://localhost:5049/assignment';

export function createAssignment(selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId) {
    return (dispatch) => {
        return dispatch({
            type: ASSIGNMENT_CREATED,
            selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId
        });
    };
}
export function fetchTemplateList() {
    return (dispatch) => {
        return axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({ type:TEMPLATES_FETCHED, templates });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function fetchEvaluationOnList() {
    return (dispatch) => {
        return axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({ type:EVALUATION_ON_FETCHED, templates });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function fetchLinkedToList() {
    return (dispatch) => {
        return axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({ type:LINKED_TO_FETCHED, templates });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function fetchAssigneeList() {
    return (dispatch) => {
        return axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromAssigneeService(response);
            dispatch({ type:ASSIGNEES_FETCHED, templates });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}

export function selectAssigneeInDropDown(selectedAssignees) {
    return updateSelectedAssignees(selectedAssignees);
}

function updateSelectedAssignees(assignees) {
    return {
        type: SELECTED_ASSIGNEES_UPDATE,
        selectedAssignees:assignees
    };
}
