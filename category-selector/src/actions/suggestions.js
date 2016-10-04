import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_INPUT,
    UPDATE_SUGGESTIONS_CACHE,
    ADD_DROPDOWN,
    RESET_DROPDOWNS
} from '../constants/ActionTypes';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(state, value, index) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    const list = state.categorySelector.dropDowns[index].suggestionsCache;

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
    return (dispatch, getState) => {
        const nextDropDown = index + 1;
        if (getState().categorySelector.dropDowns[nextDropDown]) {
            dispatch(resetDropDowns(nextDropDown));
        }

        return dispatch({
            type: UPDATE_INPUT,
            index,
            value
        });
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS,
        suggestions: []
    };
}

export function resetDropDowns(index) {
    return {
        type: RESET_DROPDOWNS,
        index
    };
}

export function updateSuggestionsCache(categories, index = 0) {

    return (dispatch, getState) => {
        if (!getState().categorySelector.dropDowns[index]) {
            dispatch({
                type: ADD_DROPDOWN,
                index
            });
        }

        return dispatch({
            type: UPDATE_SUGGESTIONS_CACHE,
            suggestionsCache: categories,
            index
        });
    };
}
