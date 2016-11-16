import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    IS_EDITING,
    IS_DELETED,
    IS_EMPTY_ADDED,
    IS_SAVED,
    IS_CREATED,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_MANDATORY_SELECTION,
    UPDATE_TEXT
} from '../constants/ActionTypes';

import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api';

const TYPE = 'searcher-requirements';

export function createItem(item) {
    return (dispatch) => {

        dispatch(createEntity({
            type: TYPE,
            attributes: item.attributes
        }))
        .then((response) => {
            dispatch({
                type: IS_CREATED,
                id: response.data.id
            });
            dispatch(addEmptyRequirement());
        });
    };
}

export function getItems() {
    return (dispatch) => {
        dispatch(requestRequirements());

        dispatch(readEndpoint(TYPE))
        .then((response) => {
            dispatch(receiveRequirements(response.data));
            dispatch(addEmptyRequirement());
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
                'category_id': item.attributes.include ? item.attributes.category_id : ''
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
    return (dispatch) => {
        dispatch(deleteEntity({
            type: TYPE,
            id: item.id
        }))
        .then(() => {
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

export function handleTextChange(item, value) {
    return {
        type: UPDATE_TEXT,
        id: item.id,
        text: value
    };
}

export function handleMandatorySelection(item, value) {
    return {
        type: UPDATE_MANDATORY_SELECTION,
        id: item.id,
        mandatory: value
    };
}

export function handleInclusionsSelection(item, value) {
    return {
        type: UPDATE_INCLUSIONS_SELECTION,
        id: item.id,
        include: value
    };
}

export function handleCategoryInclusionChange(item, value) {
    return {
        type: UPDATE_INCLUSIONS_CATEGORY,
        id: item.id,
        'category_id': value
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