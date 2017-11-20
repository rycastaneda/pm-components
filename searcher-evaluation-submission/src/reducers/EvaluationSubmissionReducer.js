import {
    INITIAL_STATE
} from '../constants/ActionTypes';

const INITIAL_EVALUATION_SUBMISSION_STATE = { sections:{}, sectionsIds:[] };

export function evaluationSubmission(state = INITIAL_EVALUATION_SUBMISSION_STATE, action) {
    switch (action.type) {

        case INITIAL_STATE:
            {
                let { sections, sectionsIds } = action;
                sections.experience.documents =[];
                return Object.assign({}, state, { sections, sectionsIds });
            }
        default:
            return state;
    }
}
