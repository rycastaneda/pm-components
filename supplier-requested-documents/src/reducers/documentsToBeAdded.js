import {
    DOCUMENTS_RECEIVING,
    RECEIVE_DOC_REQUIREMENTS,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS
} from '../constants';
import { IN_PROGRESS, SUCCESS, FAILED } from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documentsToBeAdded(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            action.docsToBeAdded.map((doc) => {
                doc.status = IN_PROGRESS;
                doc.progress = 15;
                state.byId[doc.id] = doc;
                state.allIds.push(doc.id);
            });

            return Object.assign({}, state);
        case RECEIVE_DOC_REQUIREMENTS:
            action.documents.data.map((document) => {
                document.attributes.status = SUCCESS;
                document.attributes.progress = 100;
                document.attributes.id = document.id;
                state.byId[document.id] = document.attributes;
                state.allIds.push(document.id);
            });

            return Object.assign({}, state);
        case DOCUMENT_UPLOAD_IN_PROGRESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.docId]: {
                        ...state.byId[action.docId],
                        progress: action.progress
                    }
                }
            };
        case DOCUMENT_UPLOAD_SUCCESS:
        case DOCUMENT_UPLOAD_FAILED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.documentId]: {
                        ...state.byId[action.documentId],
                        progress: 100,
                        status: action.type === DOCUMENT_UPLOAD_SUCCESS ? SUCCESS : FAILED
                    }
                }
            };
        default:
            return state;
    }
}