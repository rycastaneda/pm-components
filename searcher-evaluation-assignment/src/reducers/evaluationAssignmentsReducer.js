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
    evaluationTypeSelected: '',
    rfqTypeSelectedId: '',
    evaluationAssignees: { meta: {} },
    isLoading: false,
    selectedAssignees: [],
};

export function evaluationAssignment(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ASSIGNMENT_CREATION_FETCH_EVALUATION_TEMPLATES_SUCCESS:
            return {
                ...state,
                evaluationTemplates: action.templates,
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


        case actionTypes.SELECTED_ASSIGNEES_UPDATE:
            return {
                ...state,
                selectedAssignees: action.assignees,
            };

        case actionTypes.IS_BUSY:
            return {
                ...state,
                isBusy: true,
            };

        default:
            return state;
    }
}
