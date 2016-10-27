import {
    RECEIVING_DOCUMENTS,
    DOCUMENT_UPLOADED,
    UPLOADING_DOCUMENTS,
    UPLOADING_DOCUMENT_FAILED,
    UPLOADING_DOCUMENT_PROGRESS
} from '../constants/ActionTypes';
import { UPLOADING, UPLOAD_SUCCESS, UPLOAD_FAILED } from '../constants';

export function documentsToBeAdded(state ={}, action) {
    switch (action.type) {
        case RECEIVING_DOCUMENTS:
            return Object.assign({}, state, {
                [action.id]: action.documents.map((document) => {
                    let modified = {
                        type: 'documents',
                        id: +new Date(),
                        attributes: Object.assign(document, {
                            progress: 0, location: document.preview
                        })
                    };

                    return modified;
                })
            });
        case UPLOADING_DOCUMENTS:
            return Object.assign({}, state, {
                [action.id]: state[action.id].map((document) => {
                    document.attributes = Object.assign(document.attributes, {
                        status: UPLOADING, progress: 0
                    });
                    return document;
                })
            });
        case UPLOADING_DOCUMENT_PROGRESS:
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
        case DOCUMENT_UPLOADED:
        case UPLOADING_DOCUMENT_FAILED:
            return Object.assign({}, state, {
                [action.id]: state[action.id].map((document) => {
                    if (document.id === action.file.id) {
                        document.attributes.progress = 100;
                        document.attributes.status = action.type === DOCUMENT_UPLOADED ? UPLOAD_SUCCESS : UPLOAD_FAILED;
                    }
                    return document;
                })
            });
        default:
            return state;
    }
}