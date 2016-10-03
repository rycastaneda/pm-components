import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    RESET_INPUTS,
    UPDATE_INPUT,
    PREPOPULATE_SUGGESTIONS,
    RESET_SUGGESTIONS_CACHE
} from '../constants/ActionTypes';

export function suggestions(state = [], action) {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            return action.suggestions;
        case RESET_SUGGESTIONS:
            return [];
        default:
            return state;
    }
}

export function inputs(state = [], action) {
    switch (action.type) {
        case UPDATE_INPUT:
            return [
                ...state.slice(0, action.index),
                action.value,
                ...state.slice(action.index + 1)
            ];
        case RESET_INPUTS:
            return state.slice(0, action.index + 1);
        default:
            return state;
    }
}

export function suggestionsCache(state = [], action) {
    switch (action.type) {
        case PREPOPULATE_SUGGESTIONS:
            return [
                ...state.slice(0, action.index),
                action.suggestion,
                ...state.slice(action.index + 1)
            ];
        case RESET_SUGGESTIONS_CACHE:
            return [];
        default:
            return state;
    }
}