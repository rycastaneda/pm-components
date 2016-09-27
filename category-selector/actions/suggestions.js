import {
    RECEIVE_SUGGESTIONS,
    REQUEST_SUGGESTIONS,
    RESET_SUGGESTIONS,
    SELECT_CATEGORY,
    RESET_INPUTS
} from '../constants/ActionTypes';


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    
    const list = state.selectedCategory[state.selectedCategoryType].related
    return list.filter(item => regex.test(item.attributes.title));
}

function receiveSuggestions(suggestions) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions
    };
}

function resetInputs() {
    return {
        type: RESET_INPUTS
    };
}

function shouldRequestSuggestions(state, value, index) {
    return state.inputs[index] !== value;
}

export function fetchRequestedSuggestions(value, index) {
    return (dispatch) => {
        dispatch(requestSuggestions(value, index));
        const suggestions = getSuggestions(value);

        return dispatch(receiveSuggestions(suggestions));
    };
}

export function requestSuggestions(value, index) {
    return {
        type: REQUEST_SUGGESTIONS,
        index,
        value
    };
}



export function requestSuggestionsIfNeeded(value, index) {
    return (dispatch, getState) => {
        if (shouldRequestSuggestions(getState(), value, index)) {
            dispatch(resetInputs());

            return dispatch(requestSuggestions(value, index));
        }
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS,
        suggestions:[]
    };
}

export function selectCategory(category, index) {
    return {
        type: SELECT_CATEGORY,
        index,
        category
    };
}