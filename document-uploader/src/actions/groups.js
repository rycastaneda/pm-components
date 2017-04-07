import {
    REQUEST_FAILED,
    GROUPS_LOADING,
    GROUPS_FETCHING,
    GROUPS_RECEIVING,
    GROUPS_RECEIVING_DEFAULTS,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_TOGGLE_UPDATING,
    GROUP_REMOVED,
    GROUP_RENAMED,
    GROUP_ENABLED,
    DOCUMENTS_RECEIVING,
    DOCUMENTS_UPLOADING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_REMOVED,
    GROUPS_DOWNLOAD_STARTED,
    GROUPS_DOWNLOADED
} from '../constants/ActionTypes';

import {
    UPLOAD_FAILED
} from '../constants';

import axios from 'axios';

export function fetchDocuments(quoteId) {
    return (dispatch) => {
        dispatch({
            type: GROUPS_FETCHING,
            quoteId
        });

        axios.get(`/document-groups?filter[defaults]=1`)
            .then((defaults) => {
                dispatch({ type: GROUPS_RECEIVING_DEFAULTS, defaults: defaults.data });
                return axios.get(`/document-groups`);
            }).then((groups) => {
                dispatch({ type: GROUPS_RECEIVING, groups: groups.data });
                return axios.get(`/searcher-quote-requests/${quoteId}/documents?include=groups`);
            }).then((documents) => {
                return dispatch({ type: DOCUMENTS_RECEIVING, documents: documents.data });
            }).catch(() => {
                dispatch({
                    type: REQUEST_FAILED
                });
            });

    };
}

export function addGroup(title) {
    return (dispatch, getState) => {
        const { quoteId } = getState().ui;

        dispatch({
            type: GROUPS_LOADING
        });

        const newGroup = {
            data: {
                type: 'document-groups',
                attributes: {
                    title,
                    quoteId
                },
                relationships: {}
            }
        };

        axios.post('/document-groups', newGroup).then((response) => {
            return dispatch({
                type: GROUP_ADDED,
                group: response.data.data
            });
        }).catch((error) => {
            return dispatch({
                type: REQUEST_FAILED,
                message: error.response.data.message
            });
        });
    };
}

export function enableGroup(groupId) {
    return (dispatch) => {
        dispatch({
            type: GROUP_ENABLED,
            groupId
        });
    };
}

export function removeGroup(groupId) {
    return (dispatch) => {
        dispatch({
            type: GROUP_TOGGLE_UPDATING,
            groupId
        });

        axios.delete(`/document-groups/${groupId}`).then(() => {
            return dispatch({
                type: GROUP_REMOVED,
                groupId
            });
        }).catch(() => {
            dispatch({
                type: GROUP_TOGGLE_UPDATING,
                groupId
            });

            return dispatch({
                type: REQUEST_FAILED
            });
        });
    };
}

export function toggleRenaming(groupId) {
    return {
        type: GROUP_RENAME_TOGGLE,
        groupId
    };
}

export function renamingGroup(groupId, newTitle) {
    return (dispatch) => {
        dispatch({
            type: GROUP_TOGGLE_UPDATING,
            groupId
        });

        const newGroup = {
            data: {
                type: 'document-groups',
                id: groupId,
                attributes: {
                    title: newTitle
                }
            }
        };

        axios.patch('/document-groups/' + groupId, newGroup).then(() => {
            dispatch({
                type: GROUP_TOGGLE_UPDATING,
                groupId
            });

            dispatch({
                type: GROUP_RENAME_TOGGLE,
                groupId
            });

            return dispatch({
                type: GROUP_RENAMED,
                groupId,
                newTitle
            });
        }).catch(() => {
            return dispatch({
                type: REQUEST_FAILED
            });
        });
    };
}

export function removeDocument(groupId, documentId) {
    return (dispatch, getState) => {
        const { quoteId } = getState().ui;
        const document = getState().documents.byId[documentId];

        if (document.status === UPLOAD_FAILED) {
            return dispatch({
                type: DOCUMENT_REMOVED,
                groupId,
                documentId
            });
        }

        dispatch({
            type: GROUP_TOGGLE_UPDATING,
            groupId
        });

        axios.delete(`/searcher-quote-requests/${quoteId}/documents/${documentId}`)
            .then((response) => {
                dispatch({
                    type: DOCUMENT_REMOVED,
                    groupId,
                    documentId
                });

                dispatch({
                    type: GROUP_TOGGLE_UPDATING,
                    groupId
                });

                return response;
            }).catch(() => {
                dispatch({
                    type: GROUP_TOGGLE_UPDATING,
                    groupId
                });

                return dispatch({
                    type: REQUEST_FAILED
                });
            });
    };
}


export function incrementProgress(id, documentId, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        documentId,
        progress
    };
}

export function dropDocuments(groupId, documents) {
    return (dispatch, getState) => {
        dispatch({
            type: DOCUMENTS_UPLOADING,
            groupId,
            documents
        });

        const { quoteId } = getState().ui;

        axios.all(
            documents.map((document) => {
                let data = new FormData();

                data.append('document', document);
                data.append('group_id', groupId);

                return axios.post('/searcher-quote-requests/' + quoteId + '/documents', data, {
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = progressEvent.loaded / progressEvent.total;

                        dispatch(incrementProgress(groupId, document.id, Math.ceil(percentCompleted * 100)));
                    }
                }).then((response) => {
                    dispatch({
                        type: DOCUMENT_UPLOAD_SUCCESS,
                        groupId,
                        documentId: document.id, 
                        newDocumentId: response.data.data.id
                    });

                    return response;
                });
            })
        ).then((response) => {
            if (!response.every(response => response.status === 200)) { // Respond to error if necessary
                dispatch({
                    type: REQUEST_FAILED
                });
            }

            return response;
        });
    };
}

export function downloadDocument(groupId, documentId) {
    return (dispatch, getState) => {
        const { quoteId } = getState().ui;
        const filename = getState().documents.byId[documentId].name;

        dispatch({ type: GROUP_TOGGLE_UPDATING, groupId });

        downloadBlob(
            axios.defaults.baseURL + `/searcher-quote-requests/${quoteId}/documents/${documentId}`, 
            filename, 
            () => {
                dispatch({ type: GROUP_TOGGLE_UPDATING, groupId });
            }
        );
    };
}

export function downloadDocumentGroup(groupId) {
    return (dispatch, getState) => {
        const { quoteId } = getState().ui;
        const title = getState().documentGroups.byId[groupId].title;

        dispatch({ type: GROUP_TOGGLE_UPDATING, groupId });

        downloadBlob(
            axios.defaults.baseURL + `/searcher-quote-requests/${quoteId}/documents?filters[group_id]=${groupId}`, 
            title.toLowerCase().split(' ').join('-'),
            () => {
                dispatch({ type: GROUP_TOGGLE_UPDATING, groupId });
            }
        );
    };
}

export function downloadDocumentGroups() {
    return (dispatch, getState) => {
        const { quoteId } = getState().ui;

        dispatch({ type: GROUPS_DOWNLOAD_STARTED });

        downloadBlob(
            axios.defaults.baseURL + `/searcher-quote-requests/${quoteId}/documents`, 
            `SearcherQR-${quoteId}`,
            () => dispatch({ type: GROUPS_DOWNLOADED })
        );
    };
}


function downloadBlob(url, filename, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        callback();
    };
    
    xhr.open('GET', url);
    xhr.setRequestHeader('accept', axios.defaults.headers.common['Accept']);
    xhr.setRequestHeader('authorization', axios.defaults.headers.common['Authorization']);
    xhr.setRequestHeader('content-type', 'application/octet-stream');
    xhr.send();
}
