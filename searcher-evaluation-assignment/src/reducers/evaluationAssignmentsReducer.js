import {
    TEMPLATES_FETCHED,
    EVALUATION_ON_FETCHED,
    ASSIGNEES_FETCHED,
    LINKED_TO_FETCHED,
    IS_BUSY
} from '../constants/ActionTypes';

const INITIAL_STATE = { evaluationTemplates: [], evaluationLinks:[], evaluationLinkedTo:[], evaluationAssignees:[], isBusy:false };

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
