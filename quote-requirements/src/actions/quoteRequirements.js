import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    REQUIREMENTS_RELATIONSHIP_UPDATED,
    IS_EDITING,
    IS_DELETED,
    IS_EMPTY_ADDED,
    IS_SAVED,
    IS_CREATED,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_MANDATORY_SELECTION,
    UPDATE_TEXT,
    UPDATE_QUOTE_ID,
    TOGGLE_VIEW_FULL_TEXT
} from '../constants/ActionTypes';

import { createEntity, readEndpoint, updateEntity, setEndpointPath } from 'redux-json-api';

const TYPE = 'searcher-requirements';

/**
 *
 * @param {Object} item
 * @returns {function(*=, *)}
 */
export function createItem(item) {
    return (dispatch, getState) => {
        dispatch(setEndpointPath(''));
        dispatch(createEntity({
            type: TYPE,
            attributes: item.attributes
        }))
            .then((response) => {
                const searcherRequirements = getState().quoteRequirements.requirementsRelationship;
                const quoteId = getState().quoteRequirements.quoteId;

                searcherRequirements.push({
                    type: TYPE,
                    id: response.data.id
                });
                dispatch(linkRequirementsToQuote(quoteId, searcherRequirements));

                dispatch({
                    type: IS_CREATED,
                    id: response.data.id
                });
                dispatch(addEmptyRequirement());
            })
        ;
    };
}
/**
 *
 * @param {string} quoteId
 * @param {Object[]} requirements
 * @returns {function(*=)}
 */
function linkRequirementsToQuote(quoteId, requirements) {
    return (dispatch) => {
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;

        dispatch(setEndpointPath(`/searcher-quote-requests/${quoteId}`));
        dispatch(updateEntity({
            type: 'requested-items',
            id: itemId,
            relationships: {
                'searcher-requirements': {
                    data: requirements
                }
            }
        })).then(() => {
            dispatch(updateRequirementsRelationship(requirements));
        });
    };
}

/**
 *
 * @param {string} itemId
 * @param {string} quoteId
 * @param {string} [categoryId='']
 * @param {boolean} [newCategory=false]
 * @returns {function(*=)}
 */
export function getItems(itemId, quoteId, categoryId = '', newCategory = false) {
    return (dispatch) => {
        // Request quote specific requirements
        dispatch(readEndpoint(`searcher-quote-requests/${quoteId}/requested-items/${itemId}?include=searcherRequirements`))
            .then((response) => {
                const relationships = response.data.relationships || {};
                const quoteSpecificRequirements = relationships.searcherRequirements ? relationships.searcherRequirements.data : [];

                // User can have 'global' requirements which are not linked to the quote
                // Global requirements are the ones user ticked with 'include to all quote requests'
                // They are supposed to be displayed for the user and be automatically linked to the quote
                // In order to do that we manually update the relationship to link all global requirements to the current quote
                if (!quoteSpecificRequirements.length || newCategory) {
                    let searcherRequirements = [];
                    // Make a request to get all quote requirements which belong to the user
                    dispatch(readEndpoint(`${TYPE}?filters[category_id]=${categoryId}`))
                        .then((list) => {
                            dispatch(receiveRequirements(list.data));

                            // Generate an array of quote requirements objects
                            list.data.forEach((item) => {
                                searcherRequirements.push({
                                    type: TYPE,
                                    id: parseInt(item.id, 10)
                                });
                            });
                            // Do a call to manually link all quote requirements to the quote
                            dispatch(linkRequirementsToQuote(quoteId, searcherRequirements));

                            dispatch(addEmptyRequirement());
                        });
                } else {
                    dispatch(updateRequirementsRelationship(quoteSpecificRequirements));
                    dispatch(receiveRequirements(response.included));
                    dispatch(addEmptyRequirement());
                }
            });
    };
}
/**
 *
 * @param {Object} item
 * @returns {function(*)}
 */
export function updateItem(item) {
    return (dispatch) => {
        dispatch(setEndpointPath(''));
        dispatch(updateEntity({
            type: TYPE,
            id: item.id,
            attributes: {
                include: item.attributes.include,
                mandatory: item.attributes.mandatory,
                text: item.attributes.text,
                'category_id': item.attributes.category_id
            }
        }))
            .then((response) => {
                dispatch({
                    type: IS_SAVED,
                    id: response.data.id
                });
            });
    };
}
/**
 *
 * @param {Object} item
 * @returns {function(*, *)}
 */
export function deleteItem(item) {
    return (dispatch, getState) => {
        const searcherRequirements = getState().quoteRequirements.requirementsRelationship.filter((s => parseInt(s.id, 10) !== parseInt(item.id, 10)));
        const quoteId = getState().quoteRequirements.quoteId;

        dispatch(linkRequirementsToQuote(quoteId, searcherRequirements));

        return dispatch({
            type: IS_DELETED,
            id: item.id
        });

    };
}
/**
 *
 * @param {Object} item
 * @returns {{type, id: string}}
 */
export function setItemAsEditing(item) {
    return {
        type: IS_EDITING,
        id: item.id
    };
}
/**
 *
 * @param {Object} item
 * @returns {{type, id: string}}
 */
export function toggleViewFullText(item) {
    return {
        type: TOGGLE_VIEW_FULL_TEXT,
        id: item.id
    };
}
/**
 *
 * @param {Object[]} requirementsRelationship
 * @returns {{type, requirementsRelationship: *}}
 */
export function updateRequirementsRelationship(requirementsRelationship) {
    return {
        type: REQUIREMENTS_RELATIONSHIP_UPDATED,
        requirementsRelationship
    };
}
/**
 *
 * @param {Object} item
 * @param {string} value
 * @returns {{type, id: string, text: *}}
 */
export function handleTextChange(item, value) {
    return {
        type: UPDATE_TEXT,
        id: item.id,
        text: value
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
 * @param {Object} item
 * @param {boolean} value
 * @returns {{type, id: string, mandatory: *}}
 */
export function handleMandatorySelection(item, value) {
    return {
        type: UPDATE_MANDATORY_SELECTION,
        id: item.id,
        mandatory: value
    };
}
/**
 *
 * @param {Object} item
 * @param {boolean} include
 * @param {number} category_id
 * @returns {{type, id: string, include: *, category_id: *}}
 */
export function handleCategoryInclusionChange(item, include, category_id) {
    return {
        type: UPDATE_INCLUSIONS_CATEGORY,
        id: item.id,
        include,
        'category_id': category_id
    };
}
/**
 *
 * @returns {{type}}
 */
export function requestRequirements() {
    return {
        type: REQUIREMENTS_REQUESTED
    };
}
/**
 *
 * @param {Object[]} items
 * @returns {{type, items: *}}
 */
export function receiveRequirements(items) {
    return {
        type: REQUIREMENTS_RECEIVED,
        items: items
    };
}
/**
 *
 * @returns {{type}}
 */
export function addEmptyRequirement() {
    return {
        type: IS_EMPTY_ADDED
    };
}