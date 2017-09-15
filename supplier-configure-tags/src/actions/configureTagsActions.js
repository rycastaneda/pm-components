import {  USERS_ALLOWED_UPDATE,
    TAG_CREATE,
     TAG_EDIT_START,
     TAG_EDIT_CANCEL,
     TAG_SAVE,
     TAG_ICON_UPDATE,
     TAG_COLOR_UPDATE,
     TAG_TITLE_UPDATE,
     TAG_DESCRIPTION_UPDATE,
     TAG_ISACTIVE_UPDATE } from '../constants/ActionTypes';

export function updateUsersAllowed(isUsersAllowed) {
    return { type:USERS_ALLOWED_UPDATE,
    isUsersAllowed };
}
export function addTag() {
    return { type:TAG_CREATE };
}
export function startTagEdit(id) {
    return { type:TAG_EDIT_START,
    id  };
}

export function saveTag(id) {
    return { type:TAG_SAVE,
    id  };
}

export function cancelTagEdit(id) {
    return { type:TAG_EDIT_CANCEL,
    id  };
}

export function setIconForTag(id, icon) {
    return { type:TAG_ICON_UPDATE,
    id, icon  };
}

export function setColorForTag(id, color) {
    return { type:TAG_COLOR_UPDATE,
    id, color  };
}

export function setTitleForTag(id, title) {
    return { type:TAG_TITLE_UPDATE,
    id, title  };
}

export function setDescriptionForTag(id, description) {
    return { type:TAG_DESCRIPTION_UPDATE,
    id, description  };
}

export function setIsActiveForTag(id, status) {
    return { type:TAG_ISACTIVE_UPDATE,
    id, status  };
}
