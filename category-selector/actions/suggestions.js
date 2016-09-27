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

function getSuggestions(list, value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    console.log(list);
    // const list = state.categoriesByCategoryType[state.selectedCategoryType].items;

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

function shouldRequestSuggestions(state, value, categoryLevel) {
    return state.inputs[categoryLevel] !== value;
}

export function fetchRequestedSuggestions(list, value, categoryLevel) {
    return (dispatch) => {
        dispatch(requestSuggestions(value, categoryLevel));
        const suggestions = getSuggestions(list, value);

        return dispatch(receiveSuggestions(suggestions));
    };
}

export function requestSuggestions(value, categoryLevel) {
    return {
        type: REQUEST_SUGGESTIONS,
        categoryLevel,
        value
    };
}



export function requestSuggestionsIfNeeded(value, categoryLevel) {
    return (dispatch, getState) => {
        if (shouldRequestSuggestions(getState(), value, categoryLevel)) {
            dispatch(resetInputs());

            return dispatch(requestSuggestions(value, categoryLevel));
        }
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS,
        suggestions:[]
    };
}

export function selectCategory(category, categoryLevel = 1) {
    return {
        type: SELECT_CATEGORY,
        categoryLevel,
        category
    };
}