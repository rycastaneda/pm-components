import {
    FETCH_DOCUMENTS,
    REQUEST_FAILED,
    TOGGLE_LOADING,
    RECEIVE_DOCUMENTS
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
                error: REQUEST_FAILED,
                loading: false
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                error: false,
                loading: !state.loading
            };
        case RECEIVE_DOCUMENTS:
            return {
                ...state,
                loading: state.userType === 'supplier' // if supplier continue loading else
            };
        default:
            return Object.assign({}, state, {
                loading: false,
                error: false
            });
    }
}
