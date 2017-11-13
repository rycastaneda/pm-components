import {
    GROUPS_FETCHING,
    GROUPS_LOADING,
    GROUPS_RECEIVING,
    GROUPS_RECEIVING_DEFAULTS,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_TOGGLE_UPDATING,
    GROUP_REMOVED,
    GROUP_RENAMED,
    GROUP_ENABLED,
    GROUPS_DOWNLOAD_STARTED,
    GROUPS_DOWNLOADED,
    DOCUMENTS_RECEIVING,
    DOCUMENTS_UPLOADING,
    DOCUMENT_REMOVED,
    DOCUMENT_UPLOAD_SUCCESS
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    loading: false,
    byId: {},
    allIds: []
};

export function documentGroups(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GROUPS_FETCHING:
        case GROUPS_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        case GROUPS_RECEIVING_DEFAULTS: return receiveDefaults(state, action);
        case GROUPS_RECEIVING:
            action.groups.data.map((group) => {
                if (state.byId[group.id]) {
                    return;
                }
                state.byId[group.id] = Object.assign({}, group.attributes, {
                    id: group.id,
                    isRenaming: false,
                    isUpdating: false,
                    isReadOnly: false,
                    showGroup: false,
                    documentIds: []
                });

                state.allIds.push(group.id);
            });

            return Object.assign({}, state, {
                loading: false
            });
        case GROUPS_DOWNLOAD_STARTED:
            return Object.assign({}, state, {
                loading: true
            });
        case GROUPS_DOWNLOADED:
            return Object.assign({}, state, {
                loading: false
            });
        case GROUP_ADDED:
            state.byId[action.group.id] = Object.assign({}, action.group.attributes, {
                id: action.group.id,
                isRenaming: false,
                isUpdating: false,
                isReadOnly: false,
                showGroup: true,
                documentIds: []
            });
            state.allIds.push(action.group.id);
            return Object.assign({}, state);
        case GROUP_REMOVED: return removeGroup(state, action);
        case GROUP_ENABLED:
            state.byId[action.groupId].showGroup = true;
            return Object.assign({}, state);
        case GROUP_TOGGLE_UPDATING:
            state.byId[action.groupId].isUpdating = !state.byId[action.groupId].isUpdating;
            return Object.assign({}, state);
        case GROUP_RENAME_TOGGLE:
            state.byId[action.groupId].isRenaming = !state.byId[action.groupId].isRenaming;
            return Object.assign({}, state);
        case GROUP_RENAMED:
            state.byId[action.groupId].title = action.newTitle;
            return Object.assign({}, state);
        case DOCUMENTS_RECEIVING:
            action.documents.data.map((document) => {
                // If document group is not existent it means document group does not belong to user but still should be added due to organizations
                if (!state.byId[document.relationships.groups.data.id]) {
                    let groupId = document.relationships.groups.data.id;
                    let group = action.documents.included.filter(include => include.id === groupId && include.type === 'document-group').pop();
                    state.byId[groupId] = Object.assign({}, group.attributes, {
                        id: groupId,
                        isRenaming: false,
                        isUpdating: false,
                        isReadOnly: false,
                        showGroup: true,
                        documentIds: [document.id]
                    });

                    state.allIds.push(groupId);
                } else {
                    state.byId[document.relationships.groups.data.id].showGroup = true;
                    state.byId[document.relationships.groups.data.id].documentIds.push(document.id);
                }
            });

            return Object.assign({}, state);
        case DOCUMENTS_UPLOADING:
            action.documents.map((document) => {
                state.byId[action.groupId].documentIds.push(document.id);
            });
            return Object.assign({}, state);
        case DOCUMENT_REMOVED:
            return removeDocument(state, action);
        case DOCUMENT_UPLOAD_SUCCESS:
            return uploadDocumentSuccess(state, action);
        default:
            return state;
    }
}

function receiveDefaults(state, action) {
    action.defaults.data.map((defaultGroup) => {
        /*
            userid = null, default = 1  - global default group (dropzone, readonly)
            userid not null, default 1 - user default group (dropzone)
            userid = null, default = 0 - global group (readonly)
        */

        state.byId[defaultGroup.id] = Object.assign({}, defaultGroup.attributes, {
            id: defaultGroup.id,
            isRenaming: false,
            isUpdating: false,
            isReadOnly: !defaultGroup.attributes.user_id,
            showGroup: !!defaultGroup.attributes.default,
            documentIds: []
        });
        state.allIds.push(defaultGroup.id);
    });

    return Object.assign({}, state);
}

function removeGroup(state, action) {
    const ids = {};

    Object.keys(state.byId).map((groupId) => {
        if (groupId === action.groupId) {
            return;
        }

        ids[groupId] = state.byId[groupId];
    });

    let index = state.allIds.indexOf(action.groupId);
    state.allIds.splice(index, 1);

    return Object.assign({}, state, {
        byId: ids
    });
}

function removeDocument(state, action) {
    const group = state.byId[action.groupId];
    let index = group.documentIds.indexOf(action.documentId);
    group.documentIds.splice(index, 1);


    return Object.assign({}, state);
}

function uploadDocumentSuccess(state, action) {
    const group = state.byId[action.groupId];
    let index = group.documentIds.indexOf(action.documentId);
    group.documentIds.splice(index, 1, action.newDocumentId);

    return Object.assign({}, state);
}
