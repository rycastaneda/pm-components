import {
    UPDATE_QUOTE_ID,
    UPDATE_REQUESTED_ITEM_ID,
    UPDATE_MATCHED_ITEM_ID,
    UPDATE_PANEL_ID,
    UPDATE_REGION_ID,
    UPDATE_ENGAGEMENT_LIMIT,
    UPDATE_ITEM_ID,
    LOAD_ITEMS_SUCCESS,
    LOAD_ITEMS_ERROR,
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_SUGGESTION
} from '../constants/ActionTypes';

import axios from 'axios';
import { requestStarted, requestCompleted, requestError } from './uiActions';

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
 * @param {Array} included
 * @param {number} id
 * @returns {supplier: Object}
 */
function getSupplier(included, id) {
    let supplier = included.filter((i) => {
        if (i.type === 'supplier' && i.id === id) {
            return i;
        }
    })[0];
    return supplier === undefined ? {} : supplier;
}

/**
 *
 * @param {Array} items
 * @param {Array} included
 * @param {string} value
 * @returns {shouldReturnAll: boolean}
 */
function checkAllSuggestions(items, included, value) {
    let shouldReturnAll = false;
    for (const item of items) {
        // Get all matchedItems
        let detailsMatchedItems = [],
            supplier = {},
            supplierTitle = '',
            matchedItems = item.relationships['matchedItems'].data;

        for (const matchedItem of matchedItems) {
            if (!shouldReturnAll) {
                // Get details of matchedItems from included
                detailsMatchedItems = detailsMatchedItems.concat(included.filter((i) => {
                    if (i.id === matchedItem.id) {
                        return i;
                    }
                }));
                // Get details of supplier from included
                supplier = getSupplier(included, detailsMatchedItems[detailsMatchedItems.length-1].relationships.matchedSupplier.data.id);
                supplierTitle = supplier ? supplier.attributes.title : '';

                shouldReturnAll = detailsMatchedItems.filter((details) => {
                    if (supplierTitle + ' - ' + details.attributes.title === value) {
                        return details;
                    }
                }).length > 0;
            }
        }
    }
    return shouldReturnAll;
}

/**
 *
 * @param {Object} state
 * @param {string} value
 * @returns {suggestions: Array}
 */
function getSuggestions(state, value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp(escapedValue, 'i');                            // Create a new regex

    let items = state.itemsReducer.items.data,                     // Get all items
        included = state.itemsReducer.items.included,                 // Get all included
        shouldReturnAll = checkAllSuggestions(items, included, value);     // Check if need to display all suggestions

    return items.map((item) => {
        let matchedItems = item.relationships['matchedItems'].data,      // Get all matchedItems
            matchedItemsDetails = [];

        for (const matchedItem of matchedItems) {
            // Get details of matchedItem from included
            matchedItemsDetails = matchedItemsDetails.concat(included.filter((i) => {
                if (i.id === matchedItem.id && i.type === 'matched-items') {
                    return i;
                }
            }));
            // @todo: Remove this injection of supplier from here // Get details of supplier from included
            matchedItemsDetails[matchedItemsDetails.length-1].supplier = getSupplier(included, matchedItemsDetails[matchedItemsDetails.length-1].relationships.matchedSupplier.data.id);
        }

        // filter matchedItemsDetails and supplier with the given value
        matchedItems = matchedItemsDetails.filter((details) => {
            let supplier = getSupplier(included, details.relationships.matchedSupplier.data.id);
            let supplierTitle = supplier ? supplier.attributes.title : '';
            return shouldReturnAll ? true : regex.test(details.attributes.title + ' - ' + supplierTitle);
        });

        return {
            requestedItem: item.attributes['service_title'] && item.attributes['title'] + ' - ' + item.attributes['service_title'] || item.attributes['title'],
            matchedItems: matchedItems
        };
        // filter items that consists of matchedItems
    }).filter(item => item.matchedItems.length > 0);
}

/**
 *
 * @param {string} quoteId
 * @returns {function(*, *)}
 */
export function loadItems(quoteId) {
    return (dispatch) => {
        dispatch(requestStarted());
        axios.get(`/searcher-quote-requests/${quoteId}/requested-items?filters[only_quoted_item]=1&include=quoteRequest,matchedItems.matchedSupplier`)
        .then((response) => {
            dispatch(loadItemsSuccess(response.data));
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(loadItemsError(error));
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}

/**
 *
 * @param {string} quoteId
 * @returns {{type, quoteId: *}}
 */
export function updateQuoteId(quoteId) {
    return {
        type: UPDATE_QUOTE_ID,
        quoteId
    };
}

/**
 *
 * @param {string} rqId
 * @returns {{type, rqId: *}}
 */
export function updateRequestedItemId(rqId) {
    return {
        type: UPDATE_REQUESTED_ITEM_ID,
        rqId
    };
}

/**
 *
 * @param {string} riqiId
 * @returns {{type, riqiId: *}}
 */
export function updateMatchedItemId(riqiId) {
    return {
        type: UPDATE_MATCHED_ITEM_ID,
        riqiId
    };
}

/**
 *
 * @param {string} panelId
 * @returns {{type, panelId: *}}
 */
export function updatePanelId(panelId) {
    return {
        type: UPDATE_PANEL_ID,
        panelId
    };
}

/**
 *
 * @param {string} regionId
 * @returns {{type, regionId: *}}
 */
export function updateRegionId(regionId) {
    return {
        type: UPDATE_REGION_ID,
        regionId
    };
}

/**
 *
 * @param {string} engagementLimit
 * @returns {{type, engagementLimit: *}}
 */
export function updateEngagemetLimit(engagementLimit) {
    return {
        type: UPDATE_ENGAGEMENT_LIMIT,
        engagementLimit
    };
}

/**
 *
 * @param {string} itemId
 * @returns {{type, itemId: *}}
 */
export function updateItemId(itemId) {
    return {
        type: UPDATE_ITEM_ID,
        itemId
    };
}

/**
 *
 * @param {Object} items
 * @returns {{type, items: Object}}
 */
export function loadItemsSuccess(items) {
    return {
        type: LOAD_ITEMS_SUCCESS,
        items
    };
}

/**
 *
 * @param {Object} error
 * @returns {{type, error: Object}}
 */
export function loadItemsError(error) {
    return {
        type: LOAD_ITEMS_ERROR,
        error
    };
}

/**
 *
 * @param {Array} suggestions
 * @returns {{type, suggestions: Array}}
 */
export function receiveSuggestions(suggestions) {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions
    };
}

/**
 *
 * @param {string} value
 * @returns {function(*, *)}
 */
export function fetchSuggestions(value) {
    return (dispatch, getState) => {
        const suggestions = getSuggestions(getState(), value);
        return dispatch(receiveSuggestions(suggestions));
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
 * @param {string} value
 * @returns {function(*, *)}
 */
export function updateSuggestion(value) {
    return (dispatch) => {
        return dispatch({
            type: UPDATE_SUGGESTION,
            value
        });
    };
}
