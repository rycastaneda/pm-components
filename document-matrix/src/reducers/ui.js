import {
    FETCH_REQUIREMENTS,
    REQUEST_FAILED,
    TOGGLE_LOADING,
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    loading: true,
    error: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS:
            return {
                ...state,
                loading: true,
                quoteId: action.quoteId,
                userType: action.userType
            };
        case RECEIVE_REQUIREMENTS:
            return {
                ...state,
                loading: false
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
            return state;
    }
}
