import {  USERS_ALLOWED_UPDATE,
    REQUEST_FAILED,
    TAG_CREATE,
    TAG_SAVE,
    TAG_EDIT_START,
    TAG_EDIT_CANCEL,
    TAG_TITLE_UPDATE,
    TAG_DESCRIPTION_UPDATE,
    TAG_ICON_UPDATE,
    TAG_COLOR_UPDATE,
    TAG_ISACTIVE_UPDATE } from '../constants/ActionTypes';

const INITIAL_DATA = { isUsersAllowed:false, availableTags:[{ id:1, iconClass:'fa-tag', color:'#ff0000', description:'testsere 1', title:'1', isEdited:false, isActive:false, previous:null }, { id:2, iconClass:'fa-arrow-right', color:'#000000', description:'testsere 2', title:'2', isEdited:false, isActive:true, previous:null }], errorMessage:null };

const TAG_SKELETON ={ iconClass:'', color:'#000', title:'', description:'', id:null, isActive:false, isEdited:true, previous:null };

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
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.previous = Object.assign({}, item);
                        item.isEdited = true;
                        return item;
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_SAVE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.previous = null;
                        item.isEdited = false;
                        return item;
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_EDIT_CANCEL:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        return item.previous;
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_TITLE_UPDATE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.title = action.title;
                        return Object.assign({}, item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_DESCRIPTION_UPDATE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.description = action.description;
                        return Object.assign({}, item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_ICON_UPDATE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.iconClass = action.icon;
                        return Object.assign({}, item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_COLOR_UPDATE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.color = action.color;
                        return Object.assign({}, item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
                return newState;
            }
        case TAG_ISACTIVE_UPDATE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === action.id) {
                        item.isActive = action.status;
                        return Object.assign({}, item);
                    } else {
                        return item;
                    }
                });
                const newState = Object.assign({}, state);
                newState.availableTags = newAvailableTags;
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
