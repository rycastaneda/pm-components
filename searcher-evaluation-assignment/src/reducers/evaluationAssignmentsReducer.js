import {
    TEMPLATES_FETCHED,
    EVALUATION_ON_FETCHED,
    ASSIGNEES_FETCHED,
    LINKED_TO_FETCHED,
    SELECTED_ASSIGNEES_UPDATE,
    IS_BUSY
} from '../constants/ActionTypes';

const INITIAL_STATE = { evaluationTemplates: [], evaluationLinks:[], evaluationLinkedTo:[], evaluationAssignees:[], isBusy:false, selectedAssignees:[] };

export function evaluationAssignment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TEMPLATES_FETCHED:
            {
                let currState= Object.assign({}, state);
                currState.evaluationTemplates =action.templates;
                return currState;
            }
        case EVALUATION_ON_FETCHED:
            {
                let currState= Object.assign({}, state);
                currState.evaluationLinks =action.templates;
                return currState;
            }
        case LINKED_TO_FETCHED:
            {
                let currState= Object.assign({}, state);
                currState.evaluationLinkedTo =action.templates;
                return currState;
            }
        case ASSIGNEES_FETCHED:
            {
                let currState= Object.assign({}, state);
                currState.evaluationAssignees =action.templates;
                return currState;
            }
        case SELECTED_ASSIGNEES_UPDATE:
            {
                let currState= Object.assign({}, state);
                currState.selectedAssignees =action.selectedAssignees;
                return currState;
            }
        case IS_BUSY:
            {
                let currState= Object.assign({}, state);
                currState.isBusy = action.status;
                return currState;
            }
        default:
            return state;
    }
}
