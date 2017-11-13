import {
    RESET_SUGGESTIONS,
    RECEIVE_SUGGESTIONS,
    SELECTED_SUGGESTION,
    RESET_SELECTED_SUGGESTION,
    UPDATE_INPUT
} from '../constants/ActionTypes';
// import axios from 'axios';

/**
 * source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 * @param {string} str
 * @returns {string|XML|*|void}
 */
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sortArray(value, items) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp(escapedValue, 'i');

    return items.filter(item => regex.test(item.attributes.title)).sort(function(a, b) {
        const value = escapedValue.toLowerCase();
        const aTitle = a.attributes.title;
        const bTitle = b.attributes.title;
        const bgnA = aTitle.substr(0, escapedValue.length).toLowerCase();
        const bgnB = bTitle.substr(0, escapedValue.length).toLowerCase();

        if (bgnA === value) {
            if (bgnB !== value) return -1;
        } else if (bgnB === value) return 1;
        return aTitle < bTitle ? -1 : (aTitle > bTitle ? 1 : 0);
    });
}

function filterSuggestions(state, value) {
    const unfilteredSuggestionsDefault = sortArray(value, state.requestedDocuments.docsSuggestions.filter((suggestion => suggestion.attributes.created_by_user_id === 0)));
    const unfilteredSuggestionsUser =  sortArray(value, state.requestedDocuments.docsSuggestions.filter((suggestion => suggestion.attributes.created_by_user_id !== 0)));

    // Filter suggestions with the given value
    return unfilteredSuggestionsDefault.concat(unfilteredSuggestionsUser);
}

export function fetchSuggestions(value) {
    return (dispatch, getState) => {
        const filtered = filterSuggestions(getState(), value);
        dispatch(receiveSuggestions(filtered));
    };
}
export function checkSelection(value) {
    window.console.log(value);
    return (dispatch, getState) => {
        const documentSuggestions = getState().documentSuggestions;
        if (documentSuggestions.selected.attributes && documentSuggestions.input !== documentSuggestions.selected.attributes.title) {
            dispatch(resetSelectedSuggestion());
        }
    };
}

export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS
    };
}

export function suggestionSelected(suggestion) {
    return {
        type: SELECTED_SUGGESTION,
        suggestion
    };
}

export function resetSelectedSuggestion() {
    return {
        type: RESET_SELECTED_SUGGESTION,
        suggestion:{}
    };
}

export function receiveSuggestions(suggestions) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions
    };
}

export function updateInput(value) {
    return {
        type: UPDATE_INPUT,
        value
    };
}
