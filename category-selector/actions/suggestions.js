import { RECEIVE_SUGGESTIONS, RESET_SUGGESTIONS, RESET_INPUTS, UPDATE_INPUT } from '../constants/ActionTypes';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(state, value, index) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    const filterName = state.selectedCategoryFilter;
    const DEFAULT_LIST = state.fetchedCategoriesByFilter[state.selectedCategoryFilter].categories || [];

    let list = index === 0 ? DEFAULT_LIST : state.selectedCategoriesByFilter[filterName][index-1].related;

    return list.filter(category => regex.test(category.attributes.title));
}

function receiveSuggestions(suggestions, index) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions,
        index
    };
}

function triggerUpdateInput(value, index) {
    return {
        type: UPDATE_INPUT,
        index,
        value
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
        return dispatch(triggerUpdateInput(value, index));
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS
    };
}

function resetInputs(index) {
    return {
        type: RESET_INPUTS,
        index
    };
}