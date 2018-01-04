import * as actionTypes from '../constants/ActionTypes';
import axios from 'axios';
import * as apiActions from './apiActions';
import { selectFromStore } from '../utils/selectFromStore';

export const createAssignment = () => (dispatch, getState) => {
    const { selectedTemplateId, selectedAssignees, selectedAssigneeChairman, selectedAssignmentEntityInstanceId, evaluationTypeSelected, currentUser } = getState().evaluationAssignment;

    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START,
    });

    // formatting assignee users to match up with service requirement
    const assigneeUserData = currentUser.role === 'Standard User' ?
        { type: 'users', 'id': currentUser.userId }
        :
        selectedAssignees.map((item) => {
            const { userId } = item;
            return {
                'type': 'users',
                'id': userId,
            };
        });

    const chairStaffData = currentUser.role === 'Standard User' ?
        null : {
            'type': 'staff',
            'id': selectedAssigneeChairman.id
        };

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
                    'data' : chairStaffData
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

export const getCurrentUserFromStore = (state) => {
    const users = selectFromStore(state.evaluationAssignment, '/user', 'users');
    const currentUser = {
        firstName: `${users[0].staff.firstName}`,
        lastName: `${users[0].staff.lastName}`,
        userId: `${users[0].staff.userId}`,
        role: `${users[0].staff.pitRoles[0].title}`,
    };

    return {
        type: actionTypes.ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER,
        currentUser,
    };
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
        dispatch(getCurrentUserFromStore(getState()));
        return;
    }

    dispatch(apiActions.fetchMatchedItems(rfqTypeSelectedId, matchedSupplierId));
};

export const updateChangeMatchedItems = matchedItemId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: matchedItemId,
    });
    dispatch(getCurrentUserFromStore(getState()));
};

export const updateChangeEngagements = engagementId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: engagementId,
    });
    dispatch(getCurrentUserFromStore(getState()));
};

export const updateChangeSuppliers = supplierId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: supplierId,
    });
    dispatch(getCurrentUserFromStore(getState()));
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


