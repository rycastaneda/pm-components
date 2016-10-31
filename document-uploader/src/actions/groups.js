import {
    GROUPS_LOADING,
    GROUPS_RECEIVING,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_UPDATING,
    GROUP_REMOVED,
    GROUP_RENAMED,
    DOCUMENTS_RECEIVING,
    DOCUMENTS_UPLOADING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_REMOVED
} from '../constants/ActionTypes';
import {
    createEntity,
    deleteEntity,
    updateEntity,
    readEndpoint
} from 'redux-json-api';
import fetch from 'isomorphic-fetch';

export function fetchDocuments() {
    return (dispatch) => {
        dispatch({
            type: GROUPS_LOADING
        });

        return dispatch(readEndpoint(`document-groups?include=documents`))
            .then((groups) => {
                if (groups && (groups.response && !groups.response.ok)) { // error
                    return;
                }

                return dispatch({ type: GROUPS_RECEIVING, groups });
            });
    };
}

export function addGroup(title, callback) {
    return (dispatch) => {
        dispatch({
            type: GROUPS_LOADING
        });

        dispatch(createEntity({
            type: 'document-groups',
            attributes: {
                title
            },
            relationships: {}
        })).then((response) => {
            callback();
            return dispatch({
                type: GROUP_ADDED,
                group: response.data
            });
        });
    };
}

export function removeGroup(group) {
    return (dispatch) => {
        dispatch({
            type: GROUPS_LOADING
        });

        dispatch(deleteEntity(group))
        .then(() => {
            return dispatch({
                type: GROUP_REMOVED,
                id: group.id
            });
        });
    };
}

export function catchFiles(index, id, documents) {
    return {
        type: DOCUMENTS_RECEIVING,
        id,
        index,
        documents
    };
}

export function removeFile(index, fileId) {
    // TODO DISPATCH REMOVING_FILE_ENDPOINT
    return (dispatch) => {
        dispatch({
            type: GROUP_UPDATING,
            index
        });

        setTimeout(() => {
            return dispatch({
                type: DOCUMENT_REMOVED,
                index,
                fileId
            });
        }, 1000);
    };
}

export function toggleRenaming(index) {
    return {
        type: GROUP_RENAME_TOGGLE,
        index
    };
}

export function renamingGroup(index, id, title) {
    return (dispatch) => {
        dispatch({
            type: GROUP_UPDATING,
            index
        });

        dispatch(updateEntity({
            type: 'document-groups',
            id,
            attributes: {
                title
            }
        }))
        .then(() => {
            return dispatch({
                type: GROUP_RENAMED,
                index,
                title
            });
        });
    };
}


export function incrementProgress(id, file_id) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        id,
        file_id
    };
}

export function uploadFile(id) {
    return (dispatch, getState) => {
        let filesToBeAdded = getState().documentsToBeAdded[id];

        dispatch({
            type: DOCUMENTS_UPLOADING,
            id
        });

        return filesToBeAdded.map((file) => {
            file.loop = true;

            let data = new FormData();

            data.append('file', file);

            // Setup dummy progress checker
            file.interval = setInterval(() => {
                if (!file.loop) {
                    return clearInterval(file.interval);
                }
                dispatch(incrementProgress(id, file.id));
            }, 1000);


            fetch('https://httpbin.org/delay/5', {
                method: 'GET'
            }).then((response) => {
                file.loop = false;
                dispatch({
                    type: response.ok &&
                        DOCUMENT_UPLOAD_SUCCESS ||
                        DOCUMENT_UPLOAD_FAILED,
                    id,
                    file
                });
            });
        });
    };
}