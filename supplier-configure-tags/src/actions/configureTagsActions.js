import {  USERS_ALLOWED_UPDATE } from '../constants/ActionTypes';
export function updateUsersAllowed(isUsersAllowed) {
    return { type:USERS_ALLOWED_UPDATE,
    isUsersAllowed };
}
