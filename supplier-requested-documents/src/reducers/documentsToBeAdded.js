import {
    DOCUMENTS_RECEIVING,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_REMOVING
} from '../constants';
import { IN_PROGRESS, SUCCESS, FAILED } from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documentsToBeAdded(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_RECEIVING:

            action.filesToBeAdded.data.map((file) => {
                file.status = IN_PROGRESS;
                file.progress = 15;
                state.byId[file.id] = file;
                state.allIds.push(file.id);
            });

            return Object.assign({}, state);
        case DOCUMENT_UPLOAD_IN_PROGRESS:
            return {
                byId: {
                    [action.file_id]: {
                        progress: action.progress,
                        ...state.byId[action.file_id]
                    },
                    ...state.byId
                },
                ...state
            };
        case DOCUMENT_UPLOAD_SUCCESS:
        case DOCUMENT_UPLOAD_FAILED:
            return {
                byId: {
                    [action.file_id]: {
                        progress: 100,
                        status: action.type === DOCUMENT_UPLOAD_SUCCESS ? SUCCESS : FAILED,
                        ...state.byId[action.file_id]
                    },
                    ...state.byId
                },
                ...state
            };
        default:
            return state;
    }
}