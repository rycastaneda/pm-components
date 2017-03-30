import {
    DOCUMENTS_RECEIVING,
    DOCUMENT_REMOVED,
    DOCUMENT_UPLOAD_SUCCESS
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documents(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            action.documents.data.map((document) => {
                state.byId[document.id] = Object.assign({}, document.attributes, {
                    id: document.id
                });

                state.allIds.push(document.id);
            });

            return Object.assign({}, state);
        case DOCUMENT_REMOVED:
            return state.filter(document => document.id !== action.id);
        case DOCUMENT_UPLOAD_SUCCESS:
            return state.concat(action.file);
        default:
            return state;
    }
}