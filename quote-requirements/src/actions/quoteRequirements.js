import {
    IS_EDITING,
    IS_DELETED,
    SAVE_REQUIREMENT,
    UPDATE_TEXT,
    ADD_NEW_ITEM,
    IS_DEFAULT_ADDED,
    IS_SAVED,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_MANDATORY_SELECTION,
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED
} from '../constants/ActionTypes';

import * as items from '../mocks/requirements.json';

export function setAsEditing(item) {
    return {
        type: IS_EDITING,
        id: item.id
    };
}

export function deleteRequirement(item) {
    return {
        type: IS_DELETED,
        id: item.id
    };
}

export function saveRequirement(item) {
    return {
        type: SAVE_REQUIREMENT,
        id: item.id,
        text: item.attributes.text
    };
}

export function updateText(item, value) {
    return {
        type: UPDATE_TEXT,
        id: item.id,
        text: value
    };
}

export function updateMandatorySelection(item, value) {
    return {
        type: UPDATE_MANDATORY_SELECTION,
        id: item.id,
        isMandatory: value
    };
}

export function updateInclusionsSelection(item) {
    return {
        type: UPDATE_INCLUSIONS_SELECTION,
        id: item.id,
        alwaysDisplay: item.alwaysDisplay
    };
}

export function addNewItem() {
    return {
        type: ADD_NEW_ITEM
    };
}

export function saveItem(item) {
    return (dispatch) => {
        dispatch(itemSaved(item));

        if (!item.id) {
            dispatch(addDefaultRequirement());
        }

    };
}

export function itemSaved(item) {
    return {
        type: IS_SAVED,
        id: item.id
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
        items: items.data
    };

}

export function addDefaultRequirement() {
    return {
        type: IS_DEFAULT_ADDED
    };
}

export function getRequirements() {
    return (dispatch) => {

        dispatch(requestRequirements());
        setTimeout(() => {
            dispatch(receiveRequirements(items));
            return dispatch(addDefaultRequirement());
        }, 1000);
    };
}