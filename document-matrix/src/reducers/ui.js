import {
    FETCH_DOCUMENTS,
    REQUEST_FAILED,
    TOGGLE_LOADING
} from '../constants';

const INITIAL_STATE = {
    loading: true,
    error: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS:
            return {
                ...state,
                loading: true,
                quoteId: action.quoteId,
                userType: action.userType
            };
        case REQUEST_FAILED:
            return {
                ...state,
                error: REQUEST_FAILED
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            };
        default:
            return Object.assign({}, state, {
                loading: false,
                error: false
            });
    }
}
