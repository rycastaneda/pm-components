import plantMinerApi from '../utils/pmApiService';

import * as actionTypes from '../constants/ActionTypes';
import { parseDataFromAssigneeService } from '../utils/dataParser';
import axios from 'axios';
import normalize from 'json-api-normalizer';

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

    axios.get(plantMinerApi.getTemplates)
        .then((response) => {
            // TO DO: move it to middleWare API
            const normalisedResponse = normalize(response.data, { endpoint: 'evaluation-templates' });
            // console.log('original response:', response);
            // console.log('normalised response:', normalisedResponse);
            dispatch({
                type: actionTypes.TEMPLATES_FETCHED,
                templates: normalisedResponse,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};


export const fetchEvaluationOnTypes = () => (dispatch) => {

    axios.get(plantMinerApi.getEvaluationAssignmentTypes)
        .then((response) => {
            const  evaluationTypes =  normalize(response.data, { endpoint: 'evaluation-types' });
            dispatch({
                type: actionTypes.EVALUATION_ON_TYPES_FETCHED,
                evaluationTypes
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message
            });
        });
};

export const fetchEvaluationTypeRfq = () => (dispatch) => {
    // RFQ Response or RFQ Items
    axios.get('/request-for-quotations')
        .then((response) => {
            const  evaluationTypesRfq =  normalize(response.data, { endpoint: 'evaluation-rfq' });
            dispatch({
                type: actionTypes.EVALUATION_ON_TYPES_RFQ_FETCHED,
                evaluationTypesRfq
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


