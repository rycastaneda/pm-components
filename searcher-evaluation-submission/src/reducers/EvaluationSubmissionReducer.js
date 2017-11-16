import {
    IS_CLICKED,
    INITIAL_STATE,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
} from '../constants/ActionTypes';

const INITIAL_EVALUATION_SUBMISSION_STATE = { buttonIsClicked: false, counter: 0 };

export function evaluationSubmission(state = INITIAL_EVALUATION_SUBMISSION_STATE, action) {
    switch (action.type) {
        case IS_CLICKED:
            return Object.assign({}, state, {
                buttonIsClicked: true
            });
        case INITIAL_STATE:
            return Object.assign({}, state, INITIAL_EVALUATION_SUBMISSION_STATE);
        case INCREMENT_COUNTER:
            return Object.assign({}, ...state, {
                counter: state.counter + 1
            });
        case DECREMENT_COUNTER:
            return Object.assign({}, ...state, {
                counter: state.counter - 1
            });
        default:
            return state;
    }
}
