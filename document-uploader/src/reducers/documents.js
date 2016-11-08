import {
    GROUPS_RECEIVING,
    DOCUMENT_REMOVED,
    DOCUMENT_UPLOAD_SUCCESS
} from '../constants/ActionTypes';

export function documents(state = [], action) {
    switch (action.type) {
        case GROUPS_RECEIVING:
            return action.groups.included && action.groups.included.documents || [];
        case DOCUMENT_REMOVED:
            return state.filter(document => document.id !== action.fileId);
        case DOCUMENT_UPLOAD_SUCCESS:
            return state.concat(action.file);
        default:
            return state;
    }
}