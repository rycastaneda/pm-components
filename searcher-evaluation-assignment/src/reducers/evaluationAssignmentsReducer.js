import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    evaluationTemplates: [],
    evaluationLinks: [],
    evaluationLinkedTo: [],
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

        case actionTypes.EVALUATION_ON_FETCHED:
            return {
                ...state,
                evaluationLinks: action.templates,
            };

        case actionTypes.LINKED_TO_FETCHED:
            return {
                ...state,
                evaluationLinkedTo: action.templates,
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
