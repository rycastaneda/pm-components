import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    RECEIVE_DOC_REQUIREMENTS,
    DOCUMENT_UPLOAD_FAILED,
    FETCH_FAILED,
    DOCUMENT_REMOVING,
    DOCUMENT_DOWNLOAD_STARTED,
    DOCUMENT_DOWNLOAD_FINISHED
} from '../constants';
import axios from 'axios';

export function fetchRequirements(quoteId, itemId, requirementId, readOnly) {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_REQUIREMENTS,
            quoteId,
            itemId,
            requirementId,
            readOnly
        });

        let ui = getState().ui; 

        axios.get(`/supplier-quote-requests/${ui.quoteId}/requested-items/${ui.requirementId}?include=complianceDocuments`)
            .then((response) => {
                if (!ui.itemId) {
                    return dispatch({ 
                        type: RECEIVE_REQUIREMENTS, 
                        requirements: response.data
                    });
                }

                axios.get(`/supplier-quote-requests/${ui.quoteId}/matched-items/${ui.itemId}/documents`)
                .then((response) => {
                    return dispatch({
                        type: RECEIVE_DOC_REQUIREMENTS,
                        documents: response.data 
                    });
                });

                return dispatch({ 
                    type: RECEIVE_REQUIREMENTS, 
                    requirements: response.data
                });
            }).catch(() => {
                return dispatch({
                    type: FETCH_FAILED
                });
            });

    };
}

export function incrementProgress(docId, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        docId,
        progress
    };
}

export function removeDocument(requirementId, docId) {
    return (dispatch, getState) => {
        const {
            quoteId, 
            itemId
        } = getState().ui;

        dispatch({
            type: DOCUMENT_REMOVING,
            requirementId,
            docId
        });

        if (getState().documentsToBeAdded.byId[docId].status === 'FAILED') {
            return;
        }

        axios.delete(
            itemId ? `/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents/${docId}`
            : `/supplier-quote-requests/${quoteId}/documents/${docId}`
        );

    };
}

export function catchDocuments(requirementId, docsToBeAdded) {
    return (dispatch, getState) => {

        dispatch({
            type: DOCUMENTS_RECEIVING,
            requirementId,
            docsToBeAdded
        });

        docsToBeAdded.map((document) => {
            let docData = new FormData(); 

            if (requirementId !== 'additional') {
                docData.append('requested_document_id', requirementId);
            }

            const {
                quoteId, 
                itemId
            } = getState().ui;

            docData.append('document', document);

            return axios.post(
                itemId ? `/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents`
                : `/supplier-quote-requests/${quoteId}/documents`, 
                docData, 
                {
                    onUploadProgress: function(progressEvent) {
                        let percentCompleted = progressEvent.loaded / progressEvent.total;
                        dispatch(incrementProgress(document.id, Math.ceil(percentCompleted * 100)));
                    }
                }
            ).then((response) => {
                dispatch({
                    type: DOCUMENT_UPLOAD_SUCCESS,
                    requirementId,
                    documentId: document.id,
                    newDocumentId: response.data.data.id,
                    attributes: response.data.data.attributes
                });

                return response;
            }).catch(() => {
                dispatch({
                    type: DOCUMENT_UPLOAD_FAILED,
                    requirementId,
                    documentId: document.id
                });
            });

        });


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

export function downloadDocument(documentId, filename) {
    return (dispatch, getState) => {
        const {
            quoteId, 
            itemId
        } = getState().ui;

        dispatch({
            type: DOCUMENT_DOWNLOAD_STARTED
        });

        downloadBlob(
            `${axios.defaults.baseURL}/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents${documentId && '/' + documentId || ''}`,
            filename,
            () => {
                dispatch({
                    type: DOCUMENT_DOWNLOAD_FINISHED
                });
            }
        );
    };
}
