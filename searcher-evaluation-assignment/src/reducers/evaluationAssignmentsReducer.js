import merge from 'deepmerge';
import * as actionTypes from '../constants/ActionTypes';
import { API_DATA_REQUEST, API_DATA_SUCCESS } from '../middleware/api';

const initialState = {
    selectedAssignees: [],
    selectedAssigneeChairman: null,
    selectedTemplateId: '',
    selectedAssignmentEntityInstanceId: '',
    evaluationTypeSelected: '',
    rfqTypeSelectedId: '',
    matchedSupplierId: '',
    currentUserRole: '',
    isLoading: false,
    meta: {},
};

export function evaluationAssignment(state = initialState, action) {
    switch (action.type) {

        case API_DATA_SUCCESS:
            return merge(
                state,
                merge(action.response, { meta: { [action.endpoint]: { loading: false } } })
            );

        case API_DATA_REQUEST:
            return merge(state, { meta: { [action.endpoint]: { loading: true } } });

        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE:
            return {
                ...state,
                selectedTemplateId: action.templateId,
            };

        case actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE:
            return {
                ...state,
                evaluationTypeSelected: action.evaluationType,
                rfqTypeSelectedId: '',
                matchedSupplierId: '',
            };

        case actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ:
            return {
                ...state,
                rfqTypeSelectedId: action.rfqTypeId,
                matchedSupplierId: '',
            };

        case actionTypes.ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID:
            return {
                ...state,
                matchedSupplierId: action.matchedSupplierId,
            };

        case actionTypes.ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE:
            return {
                ...state,
            };

        case actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE:
            return {
                ...state,
                selectedAssignees: action.assignees,
            };

        case actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE:
            return {
                ...state,
                selectedAssigneeChairman: action.assigneeChairman,
            };

        case actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID:
            return {
                ...state,
                selectedAssignmentEntityInstanceId: action.selectedAssignmentEntityInstanceId,
            };

        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case  actionTypes.ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES:
            return {
                ...state,
                currentUserRole: action.currentUserRole
            };

        default:
            return state;
    }
}
