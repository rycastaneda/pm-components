import {  USERS_ALLOWED_UPDATE, REQUEST_FAILED, TAGS_CREATE } from '../constants/ActionTypes';

const INITIAL_DATA = { isUsersAllowed:false, availableTags:[{ description:'testsere 1', title:'1' }, { description:'testsere 2', title:'2' }], errorMessage:null };
const TAG_SKELETON ={ iconClass:'', color:'#000', title:'', description:'', id:null, isDeleted:false };
export function configureTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case USERS_ALLOWED_UPDATE:
            state.isUsersAllowed = action.isUsersAllowed;
            return Object.assign({}, state);
        case REQUEST_FAILED:
            state.errorMessage = action.errorMessage;
            return Object.assign({}, state);
        case TAGS_CREATE:
            state.availableTags.push(getNewTag());
            return Object.assign({}, state);
        default:
            return state;
    }
}
function getNewTag() {
    return Object.assign({}, TAG_SKELETON);
}
