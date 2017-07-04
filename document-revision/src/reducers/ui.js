import {
    FETCH_REVISIONS,
    RECEIVE_REVISIONS,
    TOGGLE_LOADING,
    REQUEST_FAILED
} from '../constants';

const INITIAL_STATE = {
    quoteId: null,
    documentId: null,
    userType: null,
    loading: true,
    error: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REVISIONS:
            return {
                ...state,
                loading: true,
                quoteId: action.quoteId,
                documentId: action.documentId,
                userType: action.userType
            };
        case RECEIVE_REVISIONS:
            return {
                ...state,
                loading: false
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            };
        case REQUEST_FAILED:
            return {
                ...state,
                error: REQUEST_FAILED
            };
        default:
            return {
                ...state,
                loading: false,
                error: false
            };
    }
}
