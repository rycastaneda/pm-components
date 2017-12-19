import {
    MODAL_PROMPT_MESSAGE,
    MODAL_CLOSE
} from '../constants/ActionTypes';

function getInitialData() {
    return { message:'', title:'', isOpen:false, onClose:null };
}

export function modal(state = getInitialData(), action) {
    switch (action.type) {
        case MODAL_PROMPT_MESSAGE:
            {

                let { message, title, onClose } = action;
                window.console.log(onClose);
                const isOpen = true;
                return { ...state, message, title, isOpen, onClose };
            }
        case MODAL_CLOSE:
            {
                const isOpen = false;
                let message  = '';
                let title = '';
                let onClose = null;
                return { ...state, message, title, isOpen, onClose };
            }
        default:
            return state;
    }
}
