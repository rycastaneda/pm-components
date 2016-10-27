import {
    RECEIVING_GROUPS,
    REMOVING_DOCUMENT,
    DOCUMENT_UPLOADED
} from '../constants/ActionTypes';

export function documents(state = [], action) {
    switch (action.type) {
        case RECEIVING_GROUPS:
            return action.groups.included || [];
        case REMOVING_DOCUMENT:
            return [
                ...state.slice(0, action.fileIndex),
                ...state.slice(action.fileIndex + 1)
            ];
        case DOCUMENT_UPLOADED:
            return state.concat(action.file);
        default:
            return state;
    }
}