import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_CATEGORY_SELECTOR_STATE,
    ADD_DROPDOWN
} from '../constants/ActionTypes';
import { readEndpoint } from 'redux-json-api';
/**
 *
 * @param {string} type
 * @returns {{type, categoryType: string}}
 */
export function requestCategories(type) {
    return {
        type: REQUEST_CATEGORIES,
        categoryType: type
    };
}

/**
 *
 * @param {Object} categoryType
 * @param {Object} categories
 * @returns {function(*)}
 */
export function receiveCategories(categoryType, categories) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            categoryType
        });

        // If we have any data to display
        if (categories.data && categories.data.length > 0) {
            dispatch(addDropDown());
        }
    };
}

/**
 *
 * @param {Object} categoryType
 * @returns {function(*)}
 */
export function fetchCategories(categoryType) {
    return (dispatch) => {
        const type = categoryType.attributes.title || '';
        const service_type = categoryType.attributes.service_type || '';
        // Dispatch a state change to indicate that categories are being fetched
        dispatch(requestCategories(type));

        dispatch(readEndpoint(`categories?filters[service_type]=${service_type}&fields[categories]=title,selectable&include=categories.categories.categories`))
            // Dispatch an action that categories have been received from API
            .then(response => dispatch(receiveCategories(type, response)));
    };
}

/**
 *
 * @param {number} [index=0]
 * @returns {{type, index: number}}
 */
export function addDropDown(index = 0) {
    return {
        type: ADD_DROPDOWN,
        index
    };
}

/**
 *
 * @param {Object} categoryType
 * @returns {function(*, *)}
 */
export function fetchCategoriesIfNeeded(categoryType) {
    return (dispatch, getState) => {
        const cachedCategoryType = getState().fetchedCategoryTypes[categoryType.attributes.title] || {};
        // Check if we have already data in available in fetchedCategoryTypes 'cache'
        const categories = cachedCategoryType.categories && cachedCategoryType.categories.hasOwnProperty('data') ?
            cachedCategoryType.categories.data.length : false;

        if (cachedCategoryType.isFetching) return;

        // Check if categories are already available in the cache
        if (!categories) {
            // If not, make an API call to get categories
            return dispatch(fetchCategories(categoryType));
        } else {
            // If they are, display an input with dropdown suggestions
            return dispatch(addDropDown());
        }

    };
}

/**
 *
 * @returns {{type}}
 */
export function resetSelectedTypes() {
    return {
        type: SET_INITIAL_CATEGORY_SELECTOR_STATE
    };
}

/**
 * @param {Object} categoryType
 * @returns {function(*)}
 */
export function selectType(categoryType) {
    const type = categoryType.attributes.title;

    return (dispatch) => {
        // Reset
        triggerDomChanges();
        dispatch(resetSelectedTypes());

        return dispatch({
            type: SELECT_CATEGORY_TYPE,
            categoryType: type
        });
    };
}

/**
 *
 * @description
 * This function dispatches select category action and
 * triggers sliding of an additional input/dropdown to allow user to select subcategories
 *
 * @param {Object} category
 * @param {number} index
 * @returns {function(*)}
 */
export function selectCategory(category, index) {
    return (dispatch) => {
        const hasSubcategories = category.relationships ? category.relationships.categories.data.length > 0 : false;
        // Trigger other onchange events
        // If user has finished selecting categories
        if (category.attributes.selectable) {
            triggerDomChanges(category.id);
        }

        dispatch({
            type: SELECT_CATEGORY,
            category,
            index
        });

        if (hasSubcategories) {
            return dispatch(addDropDown(index + 1));
        }

    };
}

/**
 *
 * @description
 * We currently have no reference to an existing php app
 * This is a workaround between events which should trigger other jquery on page events
 * In case of category selector,
 * On selection of a category we need to indicate a change event for jquery to trigger sliding of containers
 *
 * Also category selector need to interact with other react component.
 * As a temporary solution, global PlantminerComponents object is introduced
 *
 * @param {number} [id=0] - category id
 */
export function triggerDomChanges(id = 0) {
    const el = document.getElementById('qr_category_id') || {};
    const triggerChange = new Event('change');

    el.value = id;
    el.dispatchEvent = el.dispatchEvent || function() {};
    el.dispatchEvent(triggerChange);

    window.PlantminerComponents = window.PlantminerComponents || {};
    window.PlantminerComponents.categorySelector = {
        selectedCategoryId: parseInt(id, 10)
    };
}