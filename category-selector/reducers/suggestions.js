import { RECEIVE_SUGGESTIONS, REQUEST_SUGGESTIONS, RESET_SUGGESTIONS, SELECT_CATEGORY, RESET_INPUTS } from '../constants/ActionTypes';

export function suggestions(state = [], action) {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
        case RESET_SUGGESTIONS:
            return action.suggestions;
        default:
            return state;
    }
}

export function inputs(state = [], action) {
    switch (action.type) {
        case REQUEST_SUGGESTIONS:
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

export function selectedCategories(state = [], action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return [
                ...state.slice(0, action.index),
                action.category,
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}