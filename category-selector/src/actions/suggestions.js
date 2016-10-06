import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_INPUT,
    ADD_DROPDOWN,
    RESET_DROPDOWNS
} from '../constants/ActionTypes';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(state, value, index) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    const currentCategories = state.fetchedCategoryTypes[state.categorySelector.selectedType].categories;
    const parentCategories = currentCategories.data;
    const included = currentCategories.included;

    const subCategories = state.categorySelector.dropDowns[index-1] ?
        state.categorySelector.dropDowns[index-1].selectedCategory.relationships.categories.data : [];

    let unfilteredSuggestions = index === 0 ? parentCategories : [];

    for (const sub of subCategories) {
        unfilteredSuggestions = unfilteredSuggestions.concat(included.filter((i) => {
            if (i.id === sub.id) {
                return i;
            }
        }));
    }

    return unfilteredSuggestions.filter(category => regex.test(category.attributes.title));
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