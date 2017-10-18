import {
    ALL_TAGS_UPDATE,
    REQUEST_FAILED,
    NEW_TAG_SAVE,
    TAG_CREATE,
    TAG_SAVE,
    TAG_EDIT_START,
    TAG_EDIT_CANCEL,
    TAG_TITLE_UPDATE,
    TAG_DESCRIPTION_UPDATE,
    TAG_ICON_UPDATE,
    TAG_COLOR_UPDATE,
    TAG_ISACTIVE_UPDATE } from '../constants/ActionTypes';
const INITIAL_DATA = { availableTags:[], errorMessage:null };

const TAG_SKELETON ={ iconClass:'fa-tag', color:'#000', title:'', description:'', id:null, isActive:true, isEdited:true, previous:null };

export function configureTags(state = INITIAL_DATA, action) {

    switch (action.type) {
        case ALL_TAGS_UPDATE:
            state.availableTags = action.availableTags;
            return Object.assign({}, state);
        case REQUEST_FAILED:
            {
                state.errorMessage = action.message;
                return Object.assign({}, state);
            }
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
        case NEW_TAG_SAVE:
            {
                let  newAvailableTags = state.availableTags.map(function(item) {
                    if (item.id === null) {
                        item.previous = null;
                        item.isEdited = false;
                        item.id=action.id;
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
                let  newAvailableTags;
                let newState;
                if (action.id===null) {
                    newAvailableTags=JSON.parse(JSON.stringify(state.availableTags));
                    newAvailableTags.shift();
                } else {
                    newAvailableTags = state.availableTags.map(function(item) {
                        if (item.id === action.id) {
                            return item.previous;
                        } else {
                            return item;
                        }
                    });

                }
                newState = Object.assign({}, state);
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
                    window.console.log(state.availableTags);
                    if (item.id === action.id) {
                        window.console.log(action.status);
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
            {
                var addedTag= state.availableTags.find(value => value.id===null);
                if (addedTag===undefined) {
                    // state.availableTags.push(getNewTag());
                    let availableTagsNew = [getNewTag(), ...state.availableTags];

                    return Object.assign({}, state, { availableTags:availableTagsNew });
                } else {
                    return state;
                }

            }
        default:
            return state;
    }
}

function getNewTag() {
    return Object.assign({}, TAG_SKELETON);
}
