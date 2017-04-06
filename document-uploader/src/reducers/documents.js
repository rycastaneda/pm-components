import {
    DOCUMENTS_RECEIVING,
    DOCUMENT_REMOVED,
    DOCUMENTS_UPLOADING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED
} from '../constants/ActionTypes';

import { 
    UPLOAD_IN_PROGRESS,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED
} from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documents(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            action.documents.data.map((document) => {
                state.byId[document.id] = Object.assign({}, document.attributes, {
                    id: document.id,
                    status: UPLOAD_SUCCESS,
                    progress: 100
                });

                state.allIds.push(document.id);
            });
            return Object.assign({}, state);
        case DOCUMENTS_UPLOADING:
            action.documents.map((document) => {
                state.byId[document.id] = Object.assign({}, document, {
                    status: UPLOAD_IN_PROGRESS,
                    name: document.name,
                    progress: 15
                });

                state.allIds.push(document.id);
            });
            
            return Object.assign({}, state);
        case DOCUMENT_UPLOAD_FAILED:
            state.byId[action.documentId] = Object.assign({}, state.byId[action.documentId], {
                id: action.documentId,
                status: UPLOAD_FAILED,
                progress: 100
            });

            return Object.assign({}, state);
        case DOCUMENT_UPLOAD_IN_PROGRESS:
            state.byId[action.documentId] = Object.assign({}, state.byId[action.documentId], {
                status: UPLOAD_IN_PROGRESS,
                progress: action.progress
            });
            
            return Object.assign({}, state);
        case DOCUMENT_REMOVED: return removeDocument(state, action);
        case DOCUMENT_UPLOAD_SUCCESS: return uploadSuccess(state, action);
        default:
            return state;
    }
}

function removeDocument(state, action) {
    const ids = {};

    state.allIds.map((documentId) => {
        if (documentId === action.documentId) {
            return;
        }

        ids[documentId] = state.byId[documentId];
    });

    let index = state.allIds.indexOf(action.documentId); 
    state.allIds.splice(index, 1);

    return Object.assign({}, state, {
        byId: ids
    });
}

function uploadSuccess(state, action) {
    const ids = {};

    state.allIds.map((documentId) => {
        if (documentId === action.documentId) {
            ids[action.newDocumentId] = Object.assign({}, state.byId[documentId], {
                id: action.newDocumentId,
                status: UPLOAD_SUCCESS,
                progress: 100
            });
            return;
        }

        ids[documentId] = state.byId[documentId];
    });

    let index = state.allIds.indexOf(action.documentId); 
    state.allIds.splice(index, 1, action.newDocumentId);

    return Object.assign({}, state, {
        byId: ids
    });
}