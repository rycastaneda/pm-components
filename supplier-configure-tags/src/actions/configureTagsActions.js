import axios from 'axios';
import { formatAvailableTagsFromInitialService, formatDataForSaveTagService, formatDataForNewTagService } from '../utils/dataParserUtil';
import {
    ALL_TAGS_UPDATE,
    TAG_CREATE,
     TAG_EDIT_START,
     TAG_EDIT_CANCEL,
     TAG_SAVE,
     TAG_ICON_UPDATE,
     TAG_COLOR_UPDATE,
     TAG_TITLE_UPDATE,
     TAG_DESCRIPTION_UPDATE,
     TAG_ISACTIVE_UPDATE,
     REQUEST_FAILED } from '../constants/ActionTypes';

export function addTag() {
    return { type:TAG_CREATE };
}
export function startTagEdit(id) {
    return { type:TAG_EDIT_START,
    id  };
}

export function saveTag(item) {
    return (dispatch) => {
        if (item.id===null) {
            axios.post('/preferred-supplier-tags', formatDataForNewTagService(item))
            .then((response) => {
                window.console.log(response);
                dispatch(onSaveTag(item.id));
            })
            .catch((error) => {
                dispatch({ type:REQUEST_FAILED, message: error.message });
            });
        } else {
            axios.patch('/preferred-supplier-tags/'+item.id, formatDataForSaveTagService(item))
            .then(() => {
                dispatch(onSaveTag(item.id));
            })
            .catch((error) => {
                dispatch({ type:REQUEST_FAILED, message: error.message });
            });
        }
    };

}
function onSaveTag(id) {
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

export function setIsActiveForTag(item, status) {
    return (dispatch) => {
        axios.patch('/preferred-supplier-tags'+item.id, formatDataForSaveTagService(item))
        .then(() => {
            dispatch(onActiveStatusChanged(item.id, status));
        })
        .catch((error) => {
            window.console.log(error);
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
function onActiveStatusChanged(id, status) {
    return { type:TAG_ISACTIVE_UPDATE,
        id, status  };
}
export function fetchAllTags() {
    return (dispatch) => {
        axios.get('/preferred-supplier-tags')
        .then((response) => {
            dispatch(onAllTagsAvailable(formatAvailableTagsFromInitialService(response.data.data)));
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

function onAllTagsAvailable(availableTags) {
    return { type:ALL_TAGS_UPDATE,
    availableTags };
}
