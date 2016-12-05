import { REQUEST_DOCUMENTS, RECEIVE_DOCUMENTS, UPDATED_CHECKBOX_VALUE, ADD_NEW_DOCUMENT } from '../constants/ActionTypes';

export function requestedDocuments(state = { docs: [], isFetching: false }, action) {
    switch (action.type) {
        case REQUEST_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_DOCUMENTS:
            return Object.assign({}, state, {
                docs: action.response
            });
        case UPDATED_CHECKBOX_VALUE:
        case ADD_NEW_DOCUMENT:
            return Object.assign({}, state, {
                docs: document(state.docs, action)
            });
        default:
            return state;
    }
}

export function document(state = [], action) {
    switch (action.type) {
        case UPDATED_CHECKBOX_VALUE:
            return state.map(doc =>
                doc.id === action.id ? {
                    ...doc, attributes: Object.assign({}, doc.attributes, {
                        checked: action.value
                    })
                }
                    : doc
            );
        case ADD_NEW_DOCUMENT:
            return [...state, action.document];
        default:
            return state;
    }
}