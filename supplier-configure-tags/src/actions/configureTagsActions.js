import {  USERS_ALLOWED_UPDATE, TAG_EDIT_START } from '../constants/ActionTypes';
export function updateUsersAllowed(isUsersAllowed) {
    return { type:USERS_ALLOWED_UPDATE,
    isUsersAllowed };
}
export function startTagEdit(item) {
    return { type:TAG_EDIT_START,
    item };
}
