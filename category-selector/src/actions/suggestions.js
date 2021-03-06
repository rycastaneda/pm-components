import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_INPUT,
    RESET_DROPDOWNS
} from '../constants/ActionTypes';

/**
 * source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 * @param {string} str
 * @returns {string|XML|*|void}
 */
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 *
 * @param {Object} state
 * @param {string} value
 * @param {number} index
 * @returns {Object[]}
 */
function getSuggestions(state, value, index) {
    const escapedValue = escapeRegexCharacters(value.trim());
    // Create a new regex
    const regex = new RegExp(escapedValue, 'i');
    // Get current categories values from categories 'cache'
    const currentCategories = state.fetchedCategoryTypes[state.categorySelector.selectedType].categories;
    // If first level category - it is considered parent
    // Get all categories
    const parentCategories = currentCategories.data;
    // SubCategories data is available in included block
    const included = currentCategories.included;
    // Get all subCategories from 'cache'
    const subCategories = state.categorySelector.dropDowns[index - 1] ?
        state.categorySelector.dropDowns[index - 1].selectedCategory.relationships.categories.data : [];

    let unfilteredSuggestions = index === 0 ? parentCategories : [];

    for (const sub of subCategories) {
        // Get subCategories which belong to the selected parent by comparing ids
        unfilteredSuggestions = unfilteredSuggestions.concat(included.filter((i) => {
            if (i.id === sub.id) {
                return i;
            }
        }));
    }
    // Filter suggestions with the given value
    return !value ? unfilteredSuggestions : unfilteredSuggestions.filter(category => regex.test(category.attributes.title)).sort(function(a, b) {
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

/**
 *
 * @param {Object[]} suggestions
 * @param {number} index
 * @returns {{type, suggestions: {Object[]}, index: {number}}}
 */
export function receiveSuggestions(suggestions, index) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions,
        index
    };
}

/**
 *
 * @param {string} value
 * @param {number} index
 * @returns {function(*, *)}
 */
export function fetchSuggestions(value, index) {
    return (dispatch, getState) => {
        const suggestions = getSuggestions(getState(), value, index);

        return dispatch(receiveSuggestions(suggestions, index));
    };
}

/**
 *
 * @param {string} value
 * @param {number} index
 * @returns {function(*, *)}
 */
export function updateInput(value, index) {
    return (dispatch, getState) => {
        const subCategoryIndex = index + 1;
        const subCategory = getState().categorySelector.dropDowns[subCategoryIndex];

        dispatch({
            type: UPDATE_INPUT,
            index,
            value
        });

        // We need to always reset preselected user values for subcategories
        if (subCategory && !subCategory.isDefault) {
            dispatch(resetDropDowns(subCategoryIndex));
        }
    };
}

/**
 *
 * @returns {{type, suggestions: Array}}
 */
export function resetSuggestions() {
    return {
        type: RESET_SUGGESTIONS,
        suggestions: []
    };
}

/**
 *
 * @param {number} index
 * @returns {{type, index: {number}}}
 */
export function resetDropDowns(index) {
    return {
        type: RESET_DROPDOWNS,
        index
    };
}