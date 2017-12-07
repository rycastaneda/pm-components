import {
    INITIAL_STATE,
    OPTION_SELECTED
} from '../constants/ActionTypes';

const INITIAL_EVALUATION_SUBMISSION_STATE = { criteriaByIndex:{}, criteriaIds:[] };

export function evaluationSubmission(state = INITIAL_EVALUATION_SUBMISSION_STATE, action) {
    switch (action.type) {

        case INITIAL_STATE:
            {
                let {
                    criteriaIds,
                    criteriaByIndex,
                    questionByIndex,
                    attachmentByIndex,
                    questionTypeByIndex,
                    scaleDefinitionByIndex,
                    questionTypeDefinitionsByIndex

                } = action;

                let newState = Object.assign({}, state, {
                    criteriaIds,
                    criteriaByIndex,
                    questionByIndex,
                    attachmentByIndex,
                    questionTypeByIndex,
                    scaleDefinitionByIndex,
                    questionTypeDefinitionsByIndex
                });
                window.console.log('state->', newState);
                return newState;
            }

        case OPTION_SELECTED:
            {
                let { scaleDefinitionId, value } = action;
                let { scaleDefinitionByIndex } = state;
                let scaleDefinition = scaleDefinitionByIndex[scaleDefinitionId];
                scaleDefinitionByIndex[scaleDefinitionId] = Object.assign({}, scaleDefinition, { checked:value });

                return { state, ...scaleDefinitionByIndex };

            }
        default:
            return state;
    }
}
