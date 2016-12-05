import { RECEIVE_SUGGESTIONS, RESET_SUGGESTIONS, UPDATE_INPUT, SELECT_SUGGESTION } from '../constants/ActionTypes';

export function documentSuggestions(state = { suggestions: [], input: '', selected: {} }, action) {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            return { ...state, suggestions: action.suggestions };
        case UPDATE_INPUT:
            return { ...state, input: action.value };
        case SELECT_SUGGESTION:
            return { ...state, selected: action.suggestion };
        case RESET_SUGGESTIONS:
            return { ...state, suggestions: [] };
        default:
            return state;
    }
}