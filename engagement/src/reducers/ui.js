import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_FAILED
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    loading: false,
    loadingCounter: 0,
    error: false,
    errorText: 'Sorry, an error occurred. Please refresh the page and try again.'
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true,
                loadingCounter: state.loadingCounter + 1
            };
        case REQUEST_COMPLETED:
            return {
                ...state,
                loading: false,
                loadingCounter: state.loadingCounter - 1
            };
        case REQUEST_FAILED:
            return {
                ...state,
                error: action.error,
                errorText: action.error.message || 'Sorry, an error occurred. Please refresh the page and try again.'
            };
        default:
            return state;
    }
}
