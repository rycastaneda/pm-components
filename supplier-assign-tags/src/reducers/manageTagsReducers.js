import { ALL_TAGS_UPDATE,
    SELECTED_TAGS_UPDATE,
    IS_BUSY,
    REQUEST_FAILED,
    TAG_COMMENT_UPDATE } from '../constants/ActionTypes';

const INITIAL_DATA = { availableTags: [],
                                                selectedTags:[],
                                                supplierId:null,
                                                isBusy:false,
                                                errorMessage:null,
                                            isReadOnly:false };

export function manageTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case ALL_TAGS_UPDATE:
            {
                let { availableTags, selectedTags, supplierId, isReadOnly } =action;
                return Object.assign({}, state, { availableTags, selectedTags, supplierId, isBusy:false, isReadOnly  });
            }
        case SELECTED_TAGS_UPDATE:
            {
                let { selectedTags } = action;
                let myState = Object.assign({}, state, { isBusy:false, selectedTags });
                return myState;
            }
        case IS_BUSY:
            return Object.assign({}, state, { isBusy:action.status });

        case REQUEST_FAILED:
            return Object.assign({}, state, { isBusy:false, errorMessage:action.message });

        case TAG_COMMENT_UPDATE:
            {
                return Object.assign({}, state, { isBusy: false, selectedTags:action.selectedTags });
            }
        default:
            return state;
    }
}
