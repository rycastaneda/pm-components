import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    REQUIREMENTS_RELATIONSHIP,
    IS_EDITING,
    IS_DELETED,
    IS_EMPTY_ADDED,
    IS_SAVED,
    IS_CREATED,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_MANDATORY_SELECTION,
    UPDATE_TEXT,
    UPDATE_QUOTE_ID
} from '../constants/ActionTypes';

import { createEntity, readEndpoint, updateEntity } from 'redux-json-api';

const TYPE = 'searcher-requirements';

export function createItem(item) {
    return (dispatch, getState) => {

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

                dispatch(updateEntity(linkRequirementsToQuote(quoteId, searcherRequirements))).then(() => {
                    dispatch(updateRequirementsRelationship(searcherRequirements));
                });

                dispatch({
                    type: IS_CREATED,
                    id: response.data.id
                });
                dispatch(addEmptyRequirement());
            })
        ;
    };
}

function linkRequirementsToQuote(quoteId, requirements) {
    return {
        type: 'searcher-quote-requests',
        id: quoteId,
        relationships: {
            'searcher-requirements': {
                data: requirements
            }
        }
    };
}

export function getItems(quoteId = '', categoryId = '', newCategory = false) {
    return (dispatch) => {
        dispatch(requestRequirements());
        // Request quote specific requirements
        dispatch(readEndpoint(`searcher-quote-requests/${quoteId}?include=searcherRequirements`))
            .then((response) => {
                const relationships = response.data.relationships;
                const quoteSpecificRequirements = relationships.searcherRequirements.data;

                // User can have 'global' requirements which are not linked to the quote
                // Global requirements are the ones user ticked with 'include to all quote requests'
                // They are supposed to be displayed for the user and be automatically linked to the quote
                // In order to do that we manually update the relationship to link all global requirements to the current quote
                if (!quoteSpecificRequirements.length || newCategory) {
                    let searcherRequirements = [];
                    // Make a request to get all quote requirements which belong to the user
                    dispatch(readEndpoint(`${TYPE}?filters[category_id]=${categoryId}`))
                        .then((list) => {
                            // Generate an array of quote requirements objects
                            list.data.forEach((item) => {
                                searcherRequirements.push({
                                    type: TYPE,
                                    id: parseInt(item.id, 10)
                                });
                            });
                            // Do a call to manually link all quote requirements to the quote
                            dispatch(updateEntity(linkRequirementsToQuote(quoteId, searcherRequirements))).then(() => {
                                dispatch(updateRequirementsRelationship(searcherRequirements));
                            });

                            dispatch(receiveRequirements(list.data));
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

export function updateItem(item) {
    return (dispatch) => {
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

export function deleteItem(item) {
    return (dispatch, getState) => {
        const searcherRequirements = getState().quoteRequirements.requirementsRelationship.filter((s => s.id !== item.id));
        const quoteId = getState().quoteRequirements.quoteId;

        dispatch(updateEntity(linkRequirementsToQuote(quoteId, searcherRequirements)))
            .then(() => {
                dispatch(updateRequirementsRelationship(searcherRequirements));

                dispatch({
                    type: IS_DELETED,
                    id: item.id
                });
            });
    };
}

export function setItemAsEditing(item) {
    return {
        type: IS_EDITING,
        id: item.id
    };
}

export function updateRequirementsRelationship(requirementsRelationship) {
    return {
        type: REQUIREMENTS_RELATIONSHIP,
        requirementsRelationship
    };
}

export function handleTextChange(item, value) {
    return {
        type: UPDATE_TEXT,
        id: item.id,
        text: value
    };
}

export function updateQuoteId(quoteId) {
    return {
        type: UPDATE_QUOTE_ID,
        quoteId
    };
}

export function handleMandatorySelection(item, value) {
    return {
        type: UPDATE_MANDATORY_SELECTION,
        id: item.id,
        mandatory: value
    };
}

export function handleCategoryInclusionChange(item, include, category_id) {
    return {
        type: UPDATE_INCLUSIONS_CATEGORY,
        id: item.id,
        include,
        'category_id': category_id
    };
}

export function requestRequirements() {
    return {
        type: REQUIREMENTS_REQUESTED
    };
}

export function receiveRequirements(items) {
    return {
        type: REQUIREMENTS_RECEIVED,
        items: items
    };
}

export function addEmptyRequirement() {
    return {
        type: IS_EMPTY_ADDED
    };
}