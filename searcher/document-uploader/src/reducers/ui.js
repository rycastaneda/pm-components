import {
    GROUPS_FETCHING,
    REQUEST_FAILED
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    quoteId: null,
    error: ''
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GROUPS_FETCHING:
            return Object.assign({}, state, {
                quoteId: action.quoteId
            });

        case REQUEST_FAILED:
            return Object.assign({}, state, {
                error: action.message || 'Something went wrong. Please try again later.'
            });

        default:
            return Object.assign({}, state, {
                error: ''
            });
    }
}
