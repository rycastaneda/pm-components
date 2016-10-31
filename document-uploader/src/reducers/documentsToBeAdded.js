import {
    DOCUMENTS_RECEIVING,
    DOCUMENTS_UPLOADING,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS
} from '../constants/ActionTypes';
import { UPLOAD_IN_PROGRESS, UPLOAD_SUCCESS, UPLOAD_FAILED } from '../constants';

export function documentsToBeAdded(state ={}, action) {
    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            return Object.assign({}, state, {
                [action.id]: action.documents.map((document, index) => {
                    let modified = {
                        type: 'documents',
                        id: +new Date() + index,
                        attributes: Object.assign(document, {
                            progress: 0, location: document.preview
                        })
                    };
                    return modified;
                })
            });
        case DOCUMENTS_UPLOADING:
            return Object.assign({}, state, {
                [action.id]: state[action.id].map((document) => {
                    document.attributes = Object.assign(document.attributes, {
                        status: UPLOAD_IN_PROGRESS, progress: 0
                    });
                    return document;
                })
            });
        case DOCUMENT_UPLOAD_IN_PROGRESS:
            return Object.assign({}, state, {
                [action.id]: state[action.id].map((document) => {
                    if (document.id === action.file_id) {
                        if (document.attributes.progress + 10 >= 100) {
                            document.attributes.progress = 95;
                        } else {
                            document.attributes.progress += 10;
                        }
                    }
                    return document;
                })
            });
        case DOCUMENT_UPLOAD_SUCCESS:
        case DOCUMENT_UPLOAD_FAILED:
            return Object.assign({}, state, {
                [action.id]: state[action.id].map((document) => {
                    if (document.id === action.file.id) {
                        document.attributes.progress = 100;
                        document.attributes.status = action.type === DOCUMENT_UPLOAD_SUCCESS ? UPLOAD_SUCCESS : UPLOAD_FAILED;
                    }
                    return document;
                })
            });
        default:
            return state;
    }
}