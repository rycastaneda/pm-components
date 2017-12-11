import plantMinerApi from '../utils/pmApiService';

import * as actionTypes from '../constants/ActionTypes';
import axios from 'axios';
import normalize from 'json-api-normalizer';



export const createAssignment = () => (dispatch, getState) => {
    const { selectedTemplateId, selectedAssignees, selectedAssignmentEntityInstanceId, evaluationTypeSelected } = getState().evaluationAssignment;
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START,
    });

    const data = {
        ['data']: {
            'type' : 'evaluation-template-assignments',
            'id' : selectedTemplateId, // TO DO:
            'attributes': {
                'assignment_entity_instance_id': selectedAssignmentEntityInstanceId
            },
            'relationships': {
                'template': {
                    'data': {
                        'type': 'evaluation-templates',
                        'id': selectedTemplateId
                    }
                },
                'assigneeUser' : {
                    'data' : selectedAssignees
                },
                'assignmentType' : {
                    'data' : {
                        'type':'evaluation-template-assignment-types',
                        'id': evaluationTypeSelected
                    }
                }
            }
        }
    };

    console.log('data to be sent: ', data);

    axios.post('/evaluation-template-assignments', data)
        .then((response) => {
            console.log(response);
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS,
            });
        })
        .catch((error) => {
            console.log(error);
        });

};

// TO DO: THIS ALL WILL GO AWAY TO MIDDLEWARE
export const fetchTemplateList = () => (dispatch) => {
    axios.get(plantMinerApi.getTemplates)
        .then((response) => {
            const evaluationTemplates = normalize(response.data, { endpoint: 'evaluation-templates' });
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TEMPLATES_SUCCESS,
                evaluationTemplates,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.REQUEST_FAILED,
                message: error.message,
            });
        });
};


export const evaluationTemplateUpdateChange = templateId => (dispatch) => {
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

    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE,
        templateId,
    });
};

export const updateChangeEvaluationType = evaluationType => (dispatch) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE,
        evaluationType,
    });

    if (evaluationType === '4') {

        axios.get('/engagements')
            .then((response) => {
                const  evaluationEngagements =  normalize(response.data, { endpoint: 'engagements' });
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

    if (evaluationType === '3') {

        axios.get('/preferred-suppliers')
            .then((response) => {
                const  evaluationSuppliers =  normalize(response.data, { endpoint: 'suppliers' });
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

    if (evaluationTypeSelected === '1') {
        dispatch({
            type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
            selectedAssignmentEntityInstanceId: matchedSupplierId,
        });

        return;
    }

    axios.get(`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`)
        .then((response) => {
            const  matchedItems =  normalize(response.data, { endpoint: 'matched-items' });
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
    return {
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: matchedItemId,
    };

};

export const updateChangeEngagements = (engagementId) => {
    return {
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: engagementId,
    };
};

export const updateChangeSuppliers = (supplierId) => {
    return {
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: supplierId,
    };
};

export const fetchAssigneeList = () => (dispatch) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_FETCH_ASSIGNEES_REQUEST_START,
    });

    axios.get('/staff')
        .then((response) => {
            const  evaluationAssignees =  normalize(response.data, { endpoint: 'evaluation-assignees' });
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


export const updateSelectedAssignees = (assignees) => {
    return {
        type: actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE,
        assignees,
    };
};

