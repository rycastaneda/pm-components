import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../constants/ActionTypes';

export function showModal(message) {
    return {
        type: SHOW_MODAL,
        message
    };
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    };
}
