import {
    INITIALIZED
} from '../constants/ActionTypes';

const INITIAL_STATE = { evaluationTemplates: [{ id:1, label:'test1' }, { id:2, label:'test12' }], evaluationLinks:[], evaluationLinkedTo:[], evaluationAssignees:[] };

export function evaluationAssignment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INITIALIZED:
            {
                let currState= Object.assign({}, state);
                currState.evaluationTemplates =action.evaluationTemplates;
                currState.evaluationLinks =  action.evaluationLinks;
                currState.evaluationLinkedTo =  action.evaluationLinkedTo;
                currState.evaluationAssignees = action.evaluationAssignees;
                return currState;
            }
        default:
            return state;
    }
}
