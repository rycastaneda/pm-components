import * as actionTypes from '../constants/ActionTypes';
import axios from 'axios';
import * as apiActions from './apiActions';

export const createAssignment = () => (dispatch, getState) => {
    const { selectedTemplateId, selectedAssignees, selectedAssigneeChairman, selectedAssignmentEntityInstanceId, evaluationTypeSelected } = getState().evaluationAssignment;
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START,
    });
    // formatting assignee users to match up with service requirement
    const assigneeUserData  = selectedAssignees.map((item) => {
        const { userId } = item;
        return {
            type: 'users',
            id: userId
        };
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
                'chairStaff': {
                    'data' : {
                        'type': 'staff',
                        'id': selectedAssigneeChairman.id
                    }
                },
                'assigneeUser' : {
                    'data' : assigneeUserData
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

    axios.post('/evaluation-template-assignments', data)
        .then((response) => {
            dispatch({
                type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS,
                response
            });
            // back to assignments list page
            window.location.href = '/searcher/evaluation_assignments/list';
        })
        .catch((error) => {
            throw error;
        });

};

export const evaluationTemplateUpdateChange = templateId => (dispatch) => {
    dispatch(apiActions.fetchEvaluationTypes());

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
        dispatch(apiActions.fetchEngagements());
        return;
    }

    if (evaluationType === '3') {
        dispatch(apiActions.fetchPreferredSuppliers());
        return;
    }

    dispatch(apiActions.fetchRequestsForQuotations());
};


export const fetchMatchedSuppliers = rfqTypeId => (dispatch) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ,
        rfqTypeId,
    });

    dispatch(apiActions.fetchRfqMatchedSuppliers(rfqTypeId));
};


export const updateChangeMatchedSuppliers = matchedSupplierId => (dispatch, getState) => {
    const { rfqTypeSelectedId, evaluationTypeSelected } = getState().evaluationAssignment;
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID,
        matchedSupplierId,
    });

    if (evaluationTypeSelected === '1') {
        dispatch({
            type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
            selectedAssignmentEntityInstanceId: matchedSupplierId,
        });

        return;
    }

    dispatch(apiActions.fetchMatchedItems(rfqTypeSelectedId, matchedSupplierId));
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

export const updateSelectedAssignees = (assignees) => {
    return {
        type: actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE,
        assignees,
    };
};

export const updateSelectedAssigneeChairman = (assigneeChairman) => {
    return {
        type: actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE,
        assigneeChairman,
    };
};
