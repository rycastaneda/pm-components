import { RESET_SUGGESTIONS, RECEIVE_SUGGESTIONS, SELECT_SUGGESTION, UPDATE_INPUT } from '../constants/ActionTypes';
import * as docs from '../mocks/mock2.json';


/**
 * source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 * @param {string} str
 * @returns {string|XML|*|void}
 */
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function filterSuggestions(state, value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    // Create a new regex
    const regex = new RegExp(escapedValue, 'i');

    const unfilteredSuggestions = state.documentSuggestions.suggestions;

    // Filter suggestions with the given value
    return unfilteredSuggestions.filter(item => regex.test(item.attributes.title)).sort(function(a, b) {
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

export function fetchSuggestions(value) {
    return (dispatch, getState) => {
        if (!getState().documentSuggestions.suggestions.length) {
            return new Promise(
                function(resolve) {
                    // Read api
                    setTimeout(() => {
                        dispatch(receiveSuggestions(docs.data));
                        resolve();
                    }, 500);
                }
            );
        } else {
            const filtered = filterSuggestions(getState(), value);
            dispatch(receiveSuggestions(filtered));
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
        type: SELECT_SUGGESTION,
        suggestion
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