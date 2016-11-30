import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_SELECTION,
    UPDATE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY,
    SAVE_COMMENTS
} from '../constants/ActionTypes';

import { readEndpoint } from 'redux-json-api';

export function getItems() {
    return (dispatch) => {
        dispatch(requestRequirements());

        dispatch(readEndpoint(`searcher-quote-requests/28167?include=searcherRequirements`))
            .then((response) => {
                dispatch(receiveRequirements(response.included));
            });
    };
}

export function handleCommentsUpdate(item, value) {
    return {
        type: UPDATE_COMMENTS,
        id: item.id,
        value
    };
}

export function handleButtonSelection(item, button) {
    return {
        type: UPDATE_SELECTION,
        id: item.id,
        buttonSelected: button
    };
}

export function toggleCommentsDisplay(item) {
    return {
        type: TOGGLE_COMMENTS_DISPLAY,
        id: item.id
    };
}

export function saveComments(item) {
    return {
        type: SAVE_COMMENTS,
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
        items: items
    };
}
