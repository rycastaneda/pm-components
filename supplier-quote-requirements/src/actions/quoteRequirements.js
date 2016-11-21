import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    SELECTION_IS_SAVED,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_TEXT
} from '../constants/ActionTypes';

import { readEndpoint, updateEntity } from 'redux-json-api';

const TYPE = 'searcher-requirements';

export function getItems(quoteId) {
    return (dispatch) => {
        dispatch(requestRequirements());

        dispatch(readEndpoint(`${TYPE}/${quoteId}/`))
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
                comment: item.attributes.text,
                selection: item.attributes.selection
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

export function handleSelection(item, value) {
    return {
        type: UPDATE_INCLUSIONS_SELECTION,
        id: item.id,
        include: value
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
