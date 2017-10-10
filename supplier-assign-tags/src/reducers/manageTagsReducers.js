import { ALL_TAGS_UPDATE, SELECTED_TAGS_UPDATE, IS_BUSY, REQUEST_FAILED, TAG_FOCUS, TAG_COMMENT_UPDATE } from '../constants/ActionTypes';

const INITIAL_DATA = { availableTags: [], selectedTags:[], supplierId:null, isBusy:false, errorMessage:null };

export function manageTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case ALL_TAGS_UPDATE:
            {
                let myState = Object.assign({}, state);
                myState.availableTags = action.availableTags;
                myState.selectedTags = action.selectedTags;
                myState.supplierId = action.supplierId;
                myState.isBusy = false;

                if (myState.selectedTags.length) {
                    myState.selectedTags[myState.selectedTags.length-1].isFocused=true;
                }
                return myState;
            }
        case SELECTED_TAGS_UPDATE:
            {
                let myState = Object.assign({}, state);
                if (action.selectedTags.length) {
                    for (let i in action.selectedTags) {
                        action.selectedTags[i].isFocused=false;
                    }
                    action.selectedTags[action.selectedTags.length-1].isFocused=true;
                }
                myState.selectedTags = action.selectedTags;
                return myState;
            }
        case IS_BUSY:
            state.isBusy = action.status;
            return Object.assign({}, state);

        case REQUEST_FAILED:
            state.isBusy = false;
            state.errorMessage = action.message;
            return Object.assign({}, state);

        case TAG_FOCUS:
            {
                let selectedTags= JSON.parse(JSON.stringify(state.selectedTags));
                for (let i in selectedTags) {
                    const currTag = selectedTags[i];
                    currTag.isFocused = (currTag.id===action.selectedItem.id);
                }
                state.selectedTags = selectedTags;
                return Object.assign({}, state);
            }

        case TAG_COMMENT_UPDATE:
            {
                let selectedTags= JSON.parse(JSON.stringify(state.selectedTags));
                for (let i in selectedTags) {
                    const currTag = selectedTags[i];
                    if (currTag.isFocused) {
                        currTag.comment = action.comment;
                    }
                }
                state.selectedTags = selectedTags;
                let myState = Object.assign({}, state);
                return myState;
            }
        default:
            return state;
    }
}
