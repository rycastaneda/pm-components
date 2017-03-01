import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_ERROR,
    VALIDATION_ERROR,
    RESET_ERROR,
    DISPLAY_SUCCESS,
    RESET_SUCCESS
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    loading: false,
    loadingCounter: 0,
    info: false,
    infoText: '',
    success: false,
    successMessage: '',
    error: false,
    errorMessage: ''
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true,
                error: false,
                loadingCounter: state.loadingCounter + 1
            };
        case REQUEST_COMPLETED:
            return {
                ...state,
                loading: false,
                loadingCounter: state.loadingCounter - 1
            };
        case REQUEST_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.error.status_code !== 401 && action.error.message || 'Sorry, an error occurred. Please refresh the page and try again.'
            };
        case VALIDATION_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.message
            };
        case RESET_ERROR:
            return {
                ...state,
                error: false,
                errorMessage: ''
            };
        case DISPLAY_SUCCESS:
            return {
                ...state,
                success: true,
                successMessage: action.message
            };
        case RESET_SUCCESS:
            return {
                ...state,
                success: false,
                successMessage: ''
            };
        default:
            return state;
    }
}
