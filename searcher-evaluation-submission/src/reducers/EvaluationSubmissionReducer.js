import {
    INITIAL_STATE,
    OPTION_SELECTED
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

        case OPTION_SELECTED:
            {
                let { sectionId, questionId, optionId, value } = action;
                let { sections } = state;
                let { questionnaire } = Object.assign({}, sections[sectionId]);
                let { options } = Object.assign({}, questionnaire[questionId]);
                options[optionId] = Object.assign({}, options[optionId], { checked:value });

                return Object.assign({}, state, { questionnaire });

            }
        default:
            return state;
    }
}
