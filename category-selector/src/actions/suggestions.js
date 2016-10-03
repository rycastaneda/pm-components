import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    RESET_INPUTS,
    UPDATE_INPUT,
    PREPOPULATE_SUGGESTIONS,
    RESET_SUGGESTIONS_CACHE
} from '../constants/ActionTypes';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(state, value, index) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    const list = state.suggestionsCache[index];

    return list.filter(category => regex.test(category.attributes.title));
}

export function receiveSuggestions(suggestions, index) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions,
        index
    };
}

export function fetchSuggestions(value, index) {
    return (dispatch, getState) => {
        const suggestions = getSuggestions(getState(), value, index);

        return dispatch(receiveSuggestions(suggestions, index));
    };
}

export function updateInput(value, index) {
    return (dispatch) => {
        dispatch(resetInputs(index));

        return dispatch({
            type: UPDATE_INPUT,
            index,
            value
        });
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS
    };
}

export function resetSuggestionsList() {
    return {
        type: RESET_SUGGESTIONS_CACHE
    };
}

export function prepopulateSuggestions(suggestion, index = 0) {
    return {
        type: PREPOPULATE_SUGGESTIONS,
        suggestion,
        index
    };
}

export function resetInputs(index) {
    return {
        type: RESET_INPUTS,
        index
    };
}