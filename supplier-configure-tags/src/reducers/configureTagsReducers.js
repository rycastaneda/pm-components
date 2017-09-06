import {  USERS_ALLOWED_UPDATE, REQUEST_FAILED } from '../constants/ActionTypes';

const INITIAL_DATA = { isUsersAllowed:false, errorMessage:null };

export function configureTags(state = INITIAL_DATA, action) {
    switch (action.type) {

        case USERS_ALLOWED_UPDATE:
            state.isUsersAllowed=action.isUsersAllowed;
            return Object.assign({}, state);
        case REQUEST_FAILED:
            state.errorMessage = action.errorMessage;
            return Object.assign({}, state);
        default:
            return state;
    }
}
