import {
    GROUPS_LOADING,
    GROUPS_RECEIVING,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_TOGGLE_UPDATING,
    GROUP_UPDATE_FAILED,
    GROUP_REMOVED,
    GROUP_RENAMED,
    DOCUMENTS_RECEIVING,
    DOCUMENTS_UPLOADING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_SUCCESS_CLEAN,
    DOCUMENT_REMOVED
} from '../constants/ActionTypes';
import {
    createEntity,
    deleteEntity,
    updateEntity,
    setEndpointPath,
    readEndpoint
} from 'redux-json-api';
import axios from 'axios';

export function fetchDocuments() {
    return (dispatch) => {
        dispatch({
            type: GROUPS_LOADING
        });

        dispatch(setEndpointPath(``));

        return dispatch(readEndpoint(`document-groups?include=documents`))
            .then((groups) => {
                if (groups && (groups.response && !groups.response.ok)) { // error
                    return;
                }

                return dispatch({ type: GROUPS_RECEIVING, groups });
            });
    };
}

export function addGroup(title, isDefault, quote_id, callback) {
    return (dispatch) => {
        dispatch({
            type: GROUPS_LOADING
        });

        dispatch(setEndpointPath(``));

        dispatch(createEntity({
            type: 'document-groups',
            attributes: {
                title,
                default: isDefault,
                quote_id
            },
            relationships: {}
        })).then((response) => {
            callback && callback();

            return dispatch({
                type: GROUP_ADDED,
                group: response.data
            });
        });
    };
}

export function removeGroup(group, index) {
    return (dispatch) => {
        dispatch({
            type: GROUP_TOGGLE_UPDATING,
            loading: true,
            index
        });

        dispatch(setEndpointPath(``));

        dispatch(deleteEntity(group))
        .then(() => {
            return dispatch({
                type: GROUP_REMOVED,
                id: group.id
            });
        }).catch(() => {
            dispatch({
                type: GROUP_TOGGLE_UPDATING,
                loading: false,
                index
            });

            return dispatch({
                type: GROUP_UPDATE_FAILED,
                index,
                errors: ['Something went wrong while removing document group. Please try again later']
            });
        });
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
            type: GROUP_TOGGLE_UPDATING,
            loading: true,
            index
        });

        dispatch(setEndpointPath(``));

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
        }).catch(() => {
            dispatch({
                type: GROUP_TOGGLE_UPDATING,
                loading: false,
                index
            });

            return dispatch({
                type: GROUP_UPDATE_FAILED,
                index,
                errors: ['Something went wrong while renaming document group. Please try again later']
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

export function removeFile(index, quote_id, file) {
    // TODO DISPATCH REMOVING_FILE_ENDPOINT
    return (dispatch) => {
        dispatch({
            type: GROUP_TOGGLE_UPDATING,
            loading: true,
            index
        });

        axios.delete(`/searcher-quote-requests/${quote_id}/documents/${file.id}`)
            .then((response) => {
                return dispatch({
                    type: DOCUMENT_REMOVED,
                    index,
                    id: response.data.data.id
                });
            }).catch(() => {
                dispatch({
                    type: GROUP_TOGGLE_UPDATING,
                    loading: false,
                    index
                });

                return dispatch({
                    type: GROUP_UPDATE_FAILED,
                    index,
                    errors: ['Something went wrong while removing the document. Please try again later']
                });
            });
    };
}


export function incrementProgress(id, file_id, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        id,
        file_id,
        progress
    };
}

export function uploadFile(group_id, index, quote_id) {
    return (dispatch, getState) => {
        const errors = [], filesToBeAdded = getState().documentsToBeAdded[group_id];

        dispatch({
            type: DOCUMENTS_UPLOADING,
            id: group_id
        });

        Promise.all(
            filesToBeAdded.map((file) => {
                file.loop = true;

                let data = new FormData();

                data.append('document', file.attributes);
                data.append('group_id', group_id);

                return axios.post('/searcher-quote-requests/' + quote_id + '/documents', data, {
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = progressEvent.loaded / progressEvent.total;

                        dispatch(incrementProgress(group_id, file.id, Math.ceil(percentCompleted * 100)));
                    }
                }).then((response) => {
                    dispatch({
                        type: DOCUMENT_UPLOAD_SUCCESS,
                        id: group_id,
                        file: Object.assign({}, file, {
                            id: response.data.data.id
                        })
                    });

                    return dispatch({
                        type: DOCUMENT_UPLOAD_SUCCESS_CLEAN,
                        id: group_id,
                        file
                    });
                }).catch(() => {
                    errors.push(`The file ${file.attributes.name} failed to upload. Please try again`);
                    dispatch({
                        type: DOCUMENT_UPLOAD_FAILED,
                        id: group_id,
                        file
                    });
                });
            })
        ).then(() => {
            dispatch({
                type: GROUP_UPDATE_FAILED,
                index,
                errors: errors
            });
        });
    };
}