import {
    GROUPS_RECEIVING,
    DOCUMENT_REMOVED,
    DOCUMENT_UPLOAD_SUCCESS
} from '../constants/ActionTypes';

export function documents(state = [], action) {
    switch (action.type) {
        case GROUPS_RECEIVING:
            if (action.groups.included) {
                return action.groups.included.filter((group) => {
                    return group.type === `searcher-quote-requests/${group.attributes.quote_id}/documents`;
                });
            }
            return [];
        case DOCUMENT_REMOVED:
            return state.filter(document => document.id !== action.id);
        case DOCUMENT_UPLOAD_SUCCESS:
            return state.concat(action.file);
        default:
            return state;
    }
}