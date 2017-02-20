import {
    REQUEST_DOCUMENTS,
    RECEIVE_DOCUMENTS,
    RECEIVE_SUGGESTIONS_DOCUMENTS,
    UPDATE_QUOTE_ID,
    UPDATED_CHECKBOX_VALUE,
    UPDATING_STATUS,
    ADD_NEW_DOCUMENT
} from '../constants/ActionTypes';

const DEFAULT_STATE = {
    docs: [],
    docsSuggestions: [],
    isFetching: false,
    quoteId: ''
};

export function requestedDocuments(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUEST_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_DOCUMENTS:
            return Object.assign({}, state, {
                docs: action.response
            });
        case RECEIVE_SUGGESTIONS_DOCUMENTS:
            return Object.assign({}, state, {
                docsSuggestions: action.response
            });
        case UPDATE_QUOTE_ID:
            return Object.assign({}, state, {
                quoteId: action.quoteId
            });
        case UPDATING_STATUS:
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
                        checked: action.value,
                        updating: action.updating
                    })
                }
                    : doc
            );
        case UPDATING_STATUS:
            return state.map(doc =>
                doc.id === action.id ? {
                    ...doc, attributes: Object.assign({}, doc.attributes, {
                        updating: action.updating
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
