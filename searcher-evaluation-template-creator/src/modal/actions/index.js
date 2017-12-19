import { MODAL_PROMPT_MESSAGE, MODAL_CLOSE } from '../constants/ActionTypes';

export function closeModal() {
    return { type: MODAL_CLOSE };
}

export function showModal(message ='', title = '', onClose = null) {
    return ({ type: MODAL_PROMPT_MESSAGE, message, title, onClose });
}
