import {  USERS_ALLOWED_UPDATE, REQUEST_FAILED, TAG_CREATE, TAG_EDIT_START } from '../constants/ActionTypes';

const INITIAL_DATA = { isUsersAllowed:false, availableTags:[{ id:1, iconClass:'fa-tag', color:'#ff0000', description:'testsere 1', title:'1', isDeleted:false, isEdited:true }, { id:2, iconClass:'fa-arrow-right', color:'#000000', description:'testsere 2', title:'2', isDeleted:false }], errorMessage:null };
const TAG_SKELETON ={ iconClass:'', color:'#000', title:'', description:'', id:null, isDeleted:false };
export function configureTags(state = INITIAL_DATA, action) {
    switch (action.type) {
        case USERS_ALLOWED_UPDATE:
            state.isUsersAllowed = action.isUsersAllowed;
            return Object.assign({}, state);
        case REQUEST_FAILED:
            state.errorMessage = action.errorMessage;
            return Object.assign({}, state);
        case TAG_EDIT_START:
            {
                let  newAvailableTags=state.availableTags.map(function(item) {
                    if (item.id===action.item.id) {
                        item.isEdited = true;
                        return item;
                    } else {
                        return item;
                    }
                });
                const newState= Object.assign({}, state);
                newState.availableTags= newAvailableTags;
                return newState;
            }
        case TAG_CREATE:
            state.availableTags.push(getNewTag());
            return Object.assign({}, state);
        default:
            return state;
    }
}
function getNewTag() {
    return Object.assign({}, TAG_SKELETON);
}
