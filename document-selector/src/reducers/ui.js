import {
    DOCUMENTS_FETCHING,
    DOCUMENTS_RECEIVING,
    OPEN_COPY_MODAL,
    CLOSE_COPY_MODAL,
    SELECT_ITEM
} from '../constants/DocumentSelector';

const INITIAL_STATE = {
    loading: false,
    selectedItem: null,
    isOpen: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_FETCHING:
            return {
                ...state,
                loading: true
            };
        case DOCUMENTS_RECEIVING:
            return {
                ...state,
                loading: false
            };
        case OPEN_COPY_MODAL:
            return {
                ...state,
                isOpen: true
            };
        case CLOSE_COPY_MODAL:
            return {
                ...state,
                isOpen: false
            };
        case SELECT_ITEM:
            return {
                ...state,
                selectedItem: action.item.label ? action.item : '',
                isOpen: false
            };
        default:
            return state;
    }
}
