import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    SELECTION_IS_SAVED,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_MANDATORY_SELECTION,
    UPDATE_TEXT
} from '../constants/ActionTypes';

import { readEndpoint, updateEntity } from 'redux-json-api';

const TYPE = 'searcher-requirements';

export function getItems() {
    return (dispatch) => {
        dispatch(requestRequirements());

        dispatch(readEndpoint(TYPE))
        .then((response) => {
            dispatch(receiveRequirements(response.data));
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
                type: SELECTION_IS_SAVED,
                id: response.data.id
            });
        });
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
