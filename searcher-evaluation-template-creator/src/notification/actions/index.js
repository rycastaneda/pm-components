import { NOTIFICATION_PROMPT_MESSAGE, NOTIFICATION_CLEAR_MESSAGES } from '../constants/ActionTypes';
import { MESSAGE_TYPE_ERROR } from '../constants';

export function clearNotifications() {
    return { type: NOTIFICATION_CLEAR_MESSAGES };
}

export function showNotification(messageType = MESSAGE_TYPE_ERROR, message ='') {
    window.console.log('sdfsdf'+NOTIFICATION_PROMPT_MESSAGE);
    return ({ type: NOTIFICATION_PROMPT_MESSAGE, messageType, message });
}
