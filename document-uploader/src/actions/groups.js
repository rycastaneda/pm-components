import {
    LOADING_GROUPS,
    RECEIVING_GROUPS,
    ADDED_GROUP,
    TOGGLING_RENAME_GROUP,
    UPDATING_GROUP,
    GROUP_REMOVED,
    GROUP_RENAMED,
    RECEIVING_DOCUMENTS,
    UPLOADING_DOCUMENTS,
    UPLOADING_DOCUMENT_PROGRESS,
    UPLOADING_DOCUMENT_FAILED,
    DOCUMENT_UPLOADED,
    REMOVING_DOCUMENT
} from '../constants/ActionTypes';
import {
    createEntity,
    deleteEntity,
    updateEntity,
    readEndpoint
} from 'redux-json-api';
import store from 'store';
import fetch from 'isomorphic-fetch';
import { handleError } from '../api/api.config';

export function fetchDocuments() {
    return (dispatch) => {
        dispatch({
            type: LOADING_GROUPS
        });
        dispatch(readEndpoint(`document-groups?include=documents`))
            .catch(error => handleError(fetchDocuments, dispatch, error))
            .then((groups) => {
                if (!groups || !groups.data.length) {
                    groups = store.get('default_groups');
                }
                return dispatch({ type: RECEIVING_GROUPS, groups });
            });
    };
}

export function addGroup(title, callback) {
    return (dispatch) => {
        dispatch({
            type: LOADING_GROUPS
        });

        dispatch(createEntity({
            type: 'document-groups',
            attributes: {
                title
            }
        })).then((response) => {
            callback();
            return dispatch({
                type: ADDED_GROUP,
                group: response.data
            });
        });
    };
}

export function removeGroup(id, index) {
    return (dispatch) => {
        dispatch({
            type: LOADING_GROUPS
        });
        dispatch(deleteEntity({
            type: 'document-groups',
            id
        }))
        .catch(error => handleError(fetchDocuments, dispatch, error))
        .then(() => {
            return dispatch({
                type: GROUP_REMOVED,
                index
            });
        });
    };
}

export function catchFiles(index, id, documents) {
    return {
        type: RECEIVING_DOCUMENTS,
        id,
        index,
        documents
    };
}

export function removeFile(index, fileIndex) {
    // TODO DISPATCH REMOVING_FILE_ENDPOINT
    return (dispatch) => {
        dispatch({
            type: UPDATING_GROUP,
            index
        });

        setTimeout(() => {
            return dispatch({
                type: REMOVING_DOCUMENT,
                index,
                fileIndex
            });
        }, 1000);
    };
}

export function toggleRenaming(index) {
    return {
        type: TOGGLING_RENAME_GROUP,
        index
    };
}

export function renamingGroup(index, id, title) {
    // TODO DISPATCH RENAMING FILE ENDPOINT
    return (dispatch) => {
        dispatch({
            type: UPDATING_GROUP,
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
        type: UPLOADING_DOCUMENT_PROGRESS,
        id,
        file_id
    };
}

export function uploadFile(id) {
    return (dispatch, getState) => {
        let filesToBeAdded = getState().documentsToBeAdded[id];
        dispatch({
            type: UPLOADING_DOCUMENTS,
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
                    type: response.ok &&  DOCUMENT_UPLOADED || UPLOADING_DOCUMENT_FAILED,
                    id,
                    file: file
                });
            });
        });
    };
}