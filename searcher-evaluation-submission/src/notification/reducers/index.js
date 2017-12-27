import {
    NOTIFICATION_PROMPT_MESSAGE,
    NOTIFICATION_CLEAR_MESSAGES
} from '../constants/ActionTypes';

import {
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_SUCCESS
} from '../constants';

function getInitialData() {
    return { messages:[] };
}

export function notification(state = getInitialData(), action) {
    switch (action.type) {
        case NOTIFICATION_PROMPT_MESSAGE:
            {
                let { message, messageType } = action;
                switch (action.messageType) {
                    case MESSAGE_TYPE_ERROR:
                        state.messages =[...state.messages, { messageClass:'error', message, messageType }];
                        break;
                    case MESSAGE_TYPE_SUCCESS:
                        state.messages =[...state.messages, { messageClass:'success', message, messageType }];
                        break;
                }
                return Object.assign({}, state);
            }
        case NOTIFICATION_CLEAR_MESSAGES:
            {
                state.messages = [];
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}
