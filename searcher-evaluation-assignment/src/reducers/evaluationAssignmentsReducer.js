import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    evaluationTemplates: { meta: {} },
    evaluationTypes: { meta: {} },
    evaluationTypesRfq: { meta: {} },
    evaluationAssignees: [],
    isBusy: false,
    selectedAssignees: [],
};

export function evaluationAssignment(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TEMPLATES_FETCHED:
            return {
                ...state,
                evaluationTemplates: action.templates,
            };

        case actionTypes.EVALUATION_ON_TYPES_FETCHED:
            return {
                ...state,
                evaluationTypes: action.evaluationTypes,
            };

        case actionTypes.EVALUATION_ON_TYPES_RFQ_FETCHED:
            return {
                ...state,
                evaluationTypesRfq: action.evaluationTypesRfq,
            };

        case actionTypes.ASSIGNEES_FETCHED:
            return {
                ...state,
                evaluationAssignees: action.templates,
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
