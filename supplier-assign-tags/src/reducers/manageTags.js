import { INITIAL_STATE, DROPDOWN_SELECT, IS_BUSY, TAG_SELECTIONS_SAVED } from '../constants/ActionTypes';

const INITIAL_DATA = { availableTags: [{ id:1, label:'a', value:'a', iconClass:'fa-info-circle' }, { id:12, label:'b', value:'b', iconClass:'fa-address-book' }], selectedTags:[], isLoadingSuggestions:false };

export function manageTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case INITIAL_STATE:
            return Object.assign({}, state, INITIAL_DATA);

        case DROPDOWN_SELECT:
            state.selectedTags=action.selectedItems;
            return Object.assign({}, state);

        case IS_BUSY:
            state.isLoadingData= action.status;
            return Object.assign({}, state);

        case TAG_SELECTIONS_SAVED:
            state.selectedTags=action.selectedTags;
            return Object.assign({}, state);
        default:
            return state;
    }
}
