import {
    ALL_TAGS_UPDATE,
     TAG_SAVE,
     NEW_TAG_SAVE,
     REQUEST_FAILED } from '../constants/ActionTypes';

const INITIAL_DATA = { availableTags:[], errorMessage:null };

export function configureTags(state = INITIAL_DATA, action) {

    switch (action.type) {
        case ALL_TAGS_UPDATE:
            state.availableTags = action.availableTags;
            return Object.assign({}, state);
        case REQUEST_FAILED:
            {
                state.errorMessage = action.message;
                return Object.assign({}, state);
            }
        case NEW_TAG_SAVE:
            {
                let availableTags = [action.item, ...state.availableTags];
                return Object.assign({}, state, { availableTags });
            }
        case TAG_SAVE:
            {
                let availableTags = state.availableTags.map(function(item) {
                    if (item.id === action.item.id) {
                        return Object.assign({}, action.item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state, { availableTags });
                return newState;
            }
        default:
            return state;
    }
}
