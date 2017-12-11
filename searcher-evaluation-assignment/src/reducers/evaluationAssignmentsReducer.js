import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    // temp gotta have this empty meta inside, will be moved to middleware later
    evaluationTemplates: { meta: {} },
    evaluationTypes: { meta: {} },
    evaluationTypesRfq: { meta: {} },
    matchedSuppliers: { meta: {} },
    matchedItems: { meta: {} },
    evaluationEngagements: { meta: {} },
    evaluationSuppliers: { meta: {} },
    evaluationAssignees: { meta: {} },
    selectedAssignees: [],
    selectedTemplateId: '',
    selectedAssignmentEntityInstanceId: '',
    evaluationTypeSelected: '',
    rfqTypeSelectedId: '',
    isLoading: false,

};

export function evaluationAssignment(state = initialState, action) {
    switch (action.type) {

        case actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TEMPLATES_SUCCESS:

            return {
                ...state,
                evaluationTemplates: action.evaluationTemplates,
            };

        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE:
            return {
                ...state,
                selectedTemplateId: action.templateId,
            };

        case actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TYPES_SUCCESS:
            return {
                ...state,
                evaluationTypes: action.evaluationTypes,
            };

        case actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE:
            return {
                ...state,
                evaluationTypeSelected: action.evaluationType,
                isLoading: true,
            };

        case actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_RFQS_SUCCESS:
            return {
                ...state,
                evaluationTypesRfq: action.evaluationTypesRfq,
                isLoading: false,
            };

        case actionTypes.ASSIGNMENT_CREATION_FETCH_ENGAGEMENTS_SUCCESS:
            return {
                ...state,
                evaluationEngagements: action.evaluationEngagements,
                isLoading: false,
            };

        case actionTypes.ASSIGNMENT_CREATION_FETCH_SUPPLIERS_SUCCESS:
            return {
                ...state,
                evaluationSuppliers: action.evaluationSuppliers,
                isLoading: false,
            };

        case actionTypes.ASSIGNMENT_CREATION_GET_MATCHED_SUPPLIERS_SUCCESS:
            return {
                ...state,
                matchedSuppliers: action.matchedSuppliers,
                rfqTypeSelectedId: action.rfqTypeId,
            };

        case actionTypes.ASSIGNMENT_CREATION_GET_MATCHED_ITEMS_SUCCESS:
            return {
                ...state,
                matchedItems: action.matchedItems,
            };


        case actionTypes.ASSIGNMENT_CREATION_FETCH_ASSIGNEES_REQUEST_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionTypes.ASSIGNMENT_CREATION_FETCH_ASSIGNEES_SUCCESS:
            return {
                ...state,
                evaluationAssignees: action.evaluationAssignees,
                isLoading: false,
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




        default:
            return state;
    }
}
