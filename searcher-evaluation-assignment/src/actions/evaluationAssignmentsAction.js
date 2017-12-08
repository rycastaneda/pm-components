import plantMinerApi from '../utils/pmApiService';

import * as actionTypes from '../constants/ActionTypes';
import axios from 'axios';
import normalize from 'json-api-normalizer';

export function createAssignment(selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId) {
    return (dispatch) => {
        return dispatch({
            type: actionTypes.ASSIGNMENT_CREATED,
            selectedTemplateId, selectedAssigneeId, selectedLinkedToId, selectedLinkId
        });
    };
}

// TO DO: THIS ALL WILL GO AWAY TO MIDDLEWARE
export const fetchTemplateList = () => (dispatch) => {

    axios.get(plantMinerApi.getTemplates)
        .then((response) => {

            const normalisedResponse = normalize(response.data, { endpoint: 'evaluation-templates' });
            // console.log('original response:', response);
            // console.log('normalised response:', normalisedResponse);
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TEMPLATES_SUCCESS,
                templates: normalisedResponse,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};


export const fetchEvaluationOnTypes = () => (dispatch) => {

    axios.get(plantMinerApi.getEvaluationAssignmentTypes)
        .then((response) => {
            const  evaluationTypes =  normalize(response.data, { endpoint: 'evaluation-types' });
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TYPES_SUCCESS,
                evaluationTypes,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};

export const updateChangeEvaluationType = evaluationType => (dispatch) => {

    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE,
        evaluationType,
    });

    if (evaluationType === 'Engagement') {

        axios.get('/engagements')
            .then((response) => {
                const  evaluationEngagements =  normalize(response.data, { endpoint: 'engagements' });
                console.log('normalised response engagements: ', evaluationEngagements);
                dispatch({
                    type: actionTypes.ASSIGNMENT_CREATION_FETCH_ENGAGEMENTS_SUCCESS,
                    evaluationEngagements,
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.REQUEST_FAILED,
                    message: error.message,
                });
            });

        return;
    }

    if (evaluationType === 'Supplier') {

        axios.get('/preferred-suppliers')
            .then((response) => {
                const  evaluationSuppliers =  normalize(response.data, { endpoint: 'suppliers' });
                console.log('normalised response suppliers: ', evaluationSuppliers);
                dispatch({
                    type: actionTypes.ASSIGNMENT_CREATION_FETCH_SUPPLIERS_SUCCESS,
                    evaluationSuppliers,
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.REQUEST_FAILED,
                    message: error.message,
                });
            });

        return;
    }

    axios.get('/request-for-quotations')
        .then((response) => {
            const  evaluationTypesRfq =  normalize(response.data, { endpoint: 'evaluation-rfq' });
            console.log('normalised response quotations', evaluationTypesRfq);
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_RFQS_SUCCESS,
                evaluationTypesRfq,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};


export const fetchMatchedSuppliers = rfqTypeId => (dispatch) => {

    axios.get(`/request-for-quotations/${rfqTypeId}/matched-suppliers`)
        .then((response) => {
            const  matchedSuppliers =  normalize(response.data, { endpoint: 'matched-suppliers' });
            console.log('normalised response fetchMatchedSuppliers:', matchedSuppliers);
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_GET_MATCHED_SUPPLIERS_SUCCESS,
                matchedSuppliers,
                rfqTypeId,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};


export const updateChangeMatchedSuppliers = matchedSupplierId => (dispatch, getState) => {
    const { rfqTypeSelectedId, evaluationTypeSelected } = getState().evaluationAssignment;

    if (evaluationTypeSelected !== 'RFQ Item') {
        return;
    }

    axios.get(`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`)
        .then((response) => {
            const  matchedItems =  normalize(response.data, { endpoint: 'matched-items' });
            console.log('original response fetchMatchedItems: ', response);
            console.log('normalised response fetchMatchedItems: ', matchedItems);

            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_GET_MATCHED_ITEMS_SUCCESS,
                matchedItems,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};


export const updateChangeMatchedItems = (matchedItemId) => {
    console.log('action creator', matchedItemId);

    return {
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_MATCHED_ITEMS,
        matchedItemId,
    };
};

export const updateChangeEngagements = (engagementId) => {
    console.log('action creator', engagementId);

    return {
        type: actionTypes.ASSIGNMENT_CREATION_ENGAGEMENT_UPDATE_CHANGE,
        engagementId,
    };
};

export const updateChangeSuppliers = (supplierId) => {
    console.log('action creator', supplierId);

    return {
        type: actionTypes.ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE,
        supplierId,
    };
};

export const fetchAssigneeList = () => (dispatch) => {

    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_FETCH_ASSIGNEES_REQUEST_START,
    });

    axios.get('/staff')
        .then((response) => {
            const  evaluationAssignees =  normalize(response.data, { endpoint: 'evaluation-assignees' });
            console.log('original response fetchAssignees: ', response);
            console.log('normalised response fetchAssignees: ', evaluationAssignees);

            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_FETCH_ASSIGNEES_SUCCESS,
                evaluationAssignees,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};

export function isBusy(status) {
    return {
        type: actionTypes.IS_BUSY,
        status,
    };
}

export const updateSelectedAssignees = (assignees) => {
    console.log('action creator', assignees);

    return {
        type: actionTypes.SELECTED_ASSIGNEES_UPDATE,
        assignees,
    };
};

