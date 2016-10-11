import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_CATEGORY_SELECTOR_STATE,
    ADD_DROPDOWN
} from '../constants/ActionTypes';
import { readEndpoint } from 'redux-json-api';

export function requestCategories(categoryType) {
    return {
        type: REQUEST_CATEGORIES,
        categoryType
    };
}

export function receiveCategories(categoryType, categories) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            categoryType
        });

        // If we have any data to display
        if (categories.data.length > 0) {
            dispatch(addDropDown());
        }
    };
}

function fetchCategories(categoryType) {
    return (dispatch) => {
        const type = categoryType.attributes.title;
        const service_type = categoryType.attributes.service_type;

        dispatch(requestCategories(type));

        dispatch(readEndpoint(`categories?filters[service_type]=${service_type}&fields[categories]=title,selectable&include=categories.categories.categories`))
            .then(response => dispatch(receiveCategories(type, response)));
    };
}

function shouldFetchCategories(state, categoryType) {
    const categoryList = state.fetchedCategoryTypes[categoryType.attributes.title];
    // Check if we have already data in available in fetchedCategoryTypes 'cache'
    if (!categoryList) return true;
    else if (categoryList.isFetching) return false;
    // TODO: add some error handling if needed
    else return;
}

function addDropDown(index = 0) {
    return {
        type: ADD_DROPDOWN,
        index
    };
}
export function fetchCategoriesIfNeeded(categoryType) {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState(), categoryType)) {
            return dispatch(fetchCategories(categoryType));
        } else {
            dispatch(addDropDown());
        }
    };
}

export function resetSelectedTypes() {
    return {
        type: SET_INITIAL_CATEGORY_SELECTOR_STATE
    };
}

export function selectType(categoryType) {
    return (dispatch) => {
        triggerDomChanges();
        dispatch(resetSelectedTypes());

        return dispatch({
            type: SELECT_CATEGORY_TYPE,
            categoryType
        });
    };
}

export function selectCategory(category, index) {
    return (dispatch) => {
        const hasSubcategories = category.relationships ? category.relationships.categories.data.length > 0 : false;
        triggerDomChanges(category.id);

        dispatch({
            type: SELECT_CATEGORY,
            category,
            index
        });

        if (hasSubcategories) {
            dispatch(addDropDown(index + 1));
        }
    };
}


function triggerDomChanges(id = 0) {
    const el = document.getElementById('qr_category_id') || {};
    const triggerChange = new Event('change');

    el.value = id;
    el.dispatchEvent = el.dispatchEvent || function() {};
    el.dispatchEvent(triggerChange);
}