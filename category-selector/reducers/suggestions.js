import { RECEIVE_SUGGESTIONS, REQUEST_SUGGESTIONS, RESET_SUGGESTIONS, SELECT_CATEGORY, RESET_INPUTS } from '../constants/ActionTypes';

const DEFAULT_INPUT_STATE = {
    1: '',
    2: '',
    3: ''
};

export function suggestions(state = [], action) {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
        case RESET_SUGGESTIONS:
            return action.suggestions;
        default:
            return state;
    }
}

export function inputs(state = DEFAULT_INPUT_STATE, action) {
    switch (action.type) {
        case REQUEST_SUGGESTIONS:
            return Object.assign({}, state, {
                [action.categoryLevel]: action.value
            });
        case RESET_INPUTS:
            return Object.assign({}, state, {
                2: '',
                3: ''
            });
        default:
            return state;
    }
}

export function selectedCategories(state = {}, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return Object.assign({}, state, {
                [action.categoryLevel]: action.category
            });
        default:
            return state;
    }
}