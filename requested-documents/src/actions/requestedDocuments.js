import { REQUEST_DOCUMENTS, RECEIVE_DOCUMENTS, UPDATED_CHECKBOX_VALUE, ADD_NEW_DOCUMENT } from '../constants/ActionTypes';
import * as docs from '../mocks/mock.json';

export function getDocuments() {
    return (dispatch) => {
        dispatch(requestDocuments());

        return new Promise(
            function(resolve) {
                // Read api
                setTimeout(() => {
                    dispatch(receiveDocuments(docs.data));
                    resolve();

                }, 1000);
            }
        );
    };
}

export function updateCheckbox(checked, document) {
    return (dispatch) => {
        // Update document checkbox value with api
        dispatch({
            type: UPDATED_CHECKBOX_VALUE,
            id: document.id,
            value: checked
        });
    };
}

export function addNewDocument() {
    return (dispatch, getState) => {
        const selected = getState().documentSuggestions.selected;
        // Send an api request to add a new document to supplier requirements
        dispatch({
            type: ADD_NEW_DOCUMENT,
            document: {
                type: 'requested-documents',
                id: selected.id,
                attributes: { ...selected.attributes, checked: true }
            }
        });
    };
}

export function requestDocuments() {
    return {
        type: REQUEST_DOCUMENTS
    };
}

export function receiveDocuments(documents) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_DOCUMENTS,
            response: documents
        });
    };
}