import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    isShowing: false,
    message: ''
};

export function modal(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isShowing: true,
                message: action.message
            };
        case HIDE_MODAL:
            return {
                ...state,
                isShowing: false,
                message: ''
            };
        default:
            return state;
    }
}
