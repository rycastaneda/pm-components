import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_CATEGORY_SELECTOR_STATE,
    ADD_DROPDOWN,
    REQUEST_FAILED
} from '../constants/ActionTypes';
import axios from 'axios';
import { resetDropDowns } from './suggestions';

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
 * @param {string} type
 * @param {Object} categories
 * @returns {function(*)}
 */
export function receiveCategories(type, categories) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            categoryType: type
        });

        // If we have any data to display
        if (categories.data && categories.data.length > 0) {
            dispatch(addDropDown());
        }
    };
}

/**
 *
 * @param {string} [type]
 * @returns {{type, categoryType: string}}
 */
export function reportError(type) {
    return {
        type: REQUEST_FAILED,
        categoryType: type
    };
}


/**
 *
 * @param {Object} categoryType
 * @returns {function(*=)}
 */
export function fetchCategories(categoryType) {
    return (dispatch) => {
        const type = categoryType.attributes.title || '';
        const service_type = categoryType.attributes.service_type || '';
        // Dispatch a state change to indicate that categories are being fetched
        dispatch(requestCategories(type));

        axios.get(`/categories?filters[service_type]=${service_type}&fields[categories]=title,selectable&include=categories.categories.categories`)
            .then((response) => {
                return dispatch(receiveCategories(type, response.data));
            })
            .catch(function() {
                dispatch(reportError(type));
            });
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
        const type = categoryType.attributes.title;
        const cachedCategoryType = getState().fetchedCategoryTypes[type] || {};
        // Check if we have already data in available in fetchedCategoryTypes 'cache'
        const categories = cachedCategoryType.categories && cachedCategoryType.categories.hasOwnProperty('data') ?
            cachedCategoryType.categories.data.length : false;

        if (cachedCategoryType.isFetching || cachedCategoryType.isApiError) return;

        // Check if categories are already available in the cache
        if (!categories) {
            // If not, make an API call to get categories
            dispatch(fetchCategories(categoryType));
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
* @param {Object} item
* @param {string} categoryId
* @param {string} quoteId
* @returns {function(*)}
*/
export function createItem(item, categoryId, quoteId) {
    return (dispatch, getState) => {
        axios.post(`/searcher-quote-requests/${quoteId}/requested-items`, { data: item }).then((response) => {
            triggerDomChanges(response.data.data.id, categoryId, getState());
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
    const hasSubcategories = category.relationships ? category.relationships.categories.data.length > 0 : false;
    const quoteId =  document.getElementById('quote_id') ? document.getElementById('quote_id').value : null;
    const itemId =  document.getElementById('item_id') ? parseInt(document.getElementById('item_id').value, 10) : null;

    const item = {
        type: 'requested-items',
        id: itemId || null,
        relationships: {
            category: {
                data: {
                    type: 'categories',
                    id: category.id
                }
            }
        }

    };

    return (dispatch, getState) => {
        dispatch({
            type: SELECT_CATEGORY,
            category,
            index
        });

        // Trigger other onchange events
        // If user has finished selecting categories
        if (category.attributes.selectable) {
            // Make an api call to generate an item service
            if (!itemId) {
                dispatch(createItem(item, category.id, quoteId));
                // If item id is already generated, make an update call
            } else {
                axios.patch(`/searcher-quote-requests/${quoteId}/requested-items/${itemId}`, { data: item }).then(() => triggerDomChanges(null, category.id, getState()));
            }
        }

        if (hasSubcategories) {
            return dispatch(addDropDown(index + 1));
        } else {
            return dispatch(resetDropDowns(index + 1));
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
 * @param {number} [categoryId=0] - category id
 */
export function triggerDomChanges(itemId = 0, categoryId = 0, state = {}) {
    const categoryField = document.getElementById('qr_category_id') || {};
    const itemField = document.getElementById('item_id') || {};
    const triggerChange = new Event('change');

    categoryField.value = categoryId;
    itemField.value = itemField.value === '0' ? itemId : itemField.value;

    categoryField.dispatchEvent = categoryField.dispatchEvent || function() {};
    categoryField.dispatchEvent(triggerChange);

    window.PlantminerComponents = window.PlantminerComponents || {};
    window.PlantminerComponents.categorySelector = {
        selectedCategoryId: parseInt(categoryId, 10),
        dropDowns: state.categorySelector ? state.categorySelector.dropDowns : {}
    };
}
