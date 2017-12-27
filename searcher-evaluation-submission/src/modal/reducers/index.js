import {
    MODAL_PROMPT_MESSAGE,
    MODAL_CLOSE
} from '../constants/ActionTypes';

function getInitialData() {
    return { message:'', title:'', isOpen:false, onClose:null, backButtonTitle:'' };
}

export function modal(state = getInitialData(), action) {
    switch (action.type) {
        case MODAL_PROMPT_MESSAGE:
            {

                let { message, title, onClose, backButtonTitle } = action;
                const isOpen = true;
                return { ...state, message, title, isOpen, onClose, backButtonTitle };
            }
        case MODAL_CLOSE:
            {
                const isOpen = false;
                let message  = '';
                let title = '';
                let onClose = null;
                let backButtonTitle ='';
                return { ...state, message, title, isOpen, onClose, backButtonTitle };
            }
        default:
            return state;
    }
}
