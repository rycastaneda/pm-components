import * as actionTypes from '../constants/ActionTypes';
import axios from 'axios';
import * as apiActions from './apiActions';
import { selectFromStore } from '../utils/selectFromStore';

export const createAssignment = () => (dispatch, getState) => {
    const { selectedTemplateId, selectedAssignees, selectedAssigneeChairman, selectedAssignmentEntityInstanceId, evaluationTypeSelected, currentUserRole } = getState().evaluationAssignment;

    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START,
    });

    // formatting assignee users to match up with service requirement
    const assigneeUserData = currentUserRole === 'Standard User' ?
        { type: 'users',
            user_id: selectFromStore(getState().evaluationAssignment, '/user', 'users')[0].id,
        }
        :
        selectedAssignees.map((item) => {
            const { user_id } = item;
            return {
                type: 'users',
                user_id
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

    console.log('to be sent', data);

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

export const getCurrentUserPitRoles = (state) => {
    const users = selectFromStore(state.evaluationAssignment, '/user', 'users');
    window.console.log('test', users);
    return {
        type: actionTypes.ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES,
        currentUserRole:'Standard User', //users[0].staff.pitRoles[0].title,
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
        dispatch(getCurrentUserPitRoles(getState()));
        return;
    }

    dispatch(apiActions.fetchMatchedItems(rfqTypeSelectedId, matchedSupplierId));
};

export const updateChangeMatchedItems = matchedItemId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: matchedItemId,
    });
    dispatch(getCurrentUserPitRoles(getState()));
};

export const updateChangeEngagements = engagementId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: engagementId,
    });
    dispatch(getCurrentUserPitRoles(getState()));
};

export const updateChangeSuppliers = supplierId => (dispatch, getState) => {
    dispatch({
        type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
        selectedAssignmentEntityInstanceId: supplierId,
    });
    dispatch(getCurrentUserPitRoles(getState()));
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


