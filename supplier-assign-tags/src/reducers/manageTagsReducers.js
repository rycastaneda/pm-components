import { ALL_TAGS_UPDATE, SELECTED_TAGS_UPDATE, IS_BUSY, REQUEST_FAILED } from '../constants/ActionTypes';

const INITIAL_DATA = { availableTags: [], selectedTags:[], supplierId:null, isBusy:false, errorMessage:null };

export function manageTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case ALL_TAGS_UPDATE:
            state.availableTags = action.availableTags;
            state.selectedTags = action.selectedTags;
            state.supplierId = action.supplierId;
            state.isBusy = false;
            return Object.assign({}, state);

        case SELECTED_TAGS_UPDATE:
            state.selectedTags = action.selectedTags;
            return Object.assign({}, state);

        case IS_BUSY:
            state.isBusy = action.status;
            return Object.assign({}, state);

        case REQUEST_FAILED:
            state.isBusy = false;
            state.errorMessage = action.message;
            return Object.assign({}, state);
        default:
            return state;
    }
}
