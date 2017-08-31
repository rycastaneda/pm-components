import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_INPUT,
    SELECTED_SUGGESTION,
    RESET_SELECTED_SUGGESTION
} from '../constants/ActionTypes';

export function documentSuggestions(state = { suggestions: [], input: '', selected: {} }, action) {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            return { ...state, suggestions: action.suggestions };
        case RESET_SUGGESTIONS:
            return { ...state, suggestions: [] };
        case UPDATE_INPUT:
            return { ...state, input: action.value };
        case SELECTED_SUGGESTION:
        case RESET_SELECTED_SUGGESTION:
            return { ...state, selected: action.suggestion };
        default:
            return state;
    }
}
