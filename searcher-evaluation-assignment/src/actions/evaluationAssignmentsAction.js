import * as actionTypes from '../constants/ActionTypes';
import { parseDataFromTemplatesService, parseDataFromAssigneeService } from '../utils/dataParser';
import axios from 'axios';

const SERVICE_URL_FRAGMENT = 'https://api.pm.local.dev/';

export function createAssignment(selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId) {
    return (dispatch) => {
        return dispatch({
            type: actionTypes.ASSIGNMENT_CREATED,
            selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId
        });
    };
}


export const fetchTemplateList = () => (dispatch) => {
    axios.get(SERVICE_URL_FRAGMENT+'evaluation-templates')
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({
                type: actionTypes.TEMPLATES_FETCHED,
                templates
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};


export const fetchEvaluationOnList = () => (dispatch) => {

    axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({
                type: actionTypes.EVALUATION_ON_FETCHED,
                templates
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};

export const fetchLinkedToList = () => (dispatch) => {
    axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromTemplatesService(response);
            dispatch({
                type: actionTypes.LINKED_TO_FETCHED,
                templates
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};


export const fetchAssigneeList = () => (dispatch) => {
    axios.get(SERVICE_URL_FRAGMENT)
        .then((response) => {
            const templates = parseDataFromAssigneeService(response);
            dispatch({
                type: actionTypes.ASSIGNEES_FETCHED,
                templates
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};


export function isBusy(status) {
    return {
        type: actionTypes.IS_BUSY,
        status
    };
}


export const updateSelectedAssignees = (assignees) => {
    console.log('action creator', assignees);

    return {
        type: actionTypes.SELECTED_ASSIGNEES_UPDATE,
        assignees
    };
};


// export function selectAssigneeInDropDown(selectedAssignees) {
//     return updateSelectedAssignees(selectedAssignees);
// }


