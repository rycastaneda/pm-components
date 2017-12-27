import { MODAL_PROMPT_MESSAGE, MODAL_CLOSE } from '../constants/ActionTypes';

export function closeModal() {
    return { type: MODAL_CLOSE };
}

export function showModal(title = '', message ='', onClose = null) {
    return ({ type: MODAL_PROMPT_MESSAGE, title, message, onClose });
}
