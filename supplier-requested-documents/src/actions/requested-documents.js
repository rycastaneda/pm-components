import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_REMOVING
} from '../constants';
import requirements from '../mocks/requirements.json';
import axios from 'axios';

export function fetchRequirements(quoteId, itemId) {
    return (dispatch) => {
        dispatch({
            type: FETCH_REQUIREMENTS,
            quoteId,
            itemId
        });

        axios.get(`http://httpbin.org/delay/1`)
        // axios.get(`/supplier-quote-requests/${quoteId}/matched-items/${itemId}?includes=quoteRequestedDocuments&fields=requestedItem`)
            .then(() => {
                return dispatch({ 
                    type: RECEIVE_REQUIREMENTS, 
                    requirements
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
    return {
        type: DOCUMENT_REMOVING,
        requirementId,
        docId
    };
}

export function catchDocuments(quoteId, itemId, requirementId, docsToBeAdded) {
    return (dispatch) => {
        dispatch({
            type: DOCUMENTS_RECEIVING,
            requirementId,
            docsToBeAdded
        });

        docsToBeAdded.map((document) => {
            let docData = new FormData(); 
            docData.append('quoteId', quoteId);
            docData.append('itemId', itemId);
            docData.append('requirementId', requirementId);
            docData.append('document', document);

            return axios.post(`http://httpbin.org/post`, docData, {
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = progressEvent.loaded / progressEvent.total;
                    dispatch(incrementProgress(document.id, Math.ceil(percentCompleted * 100)));
                }
            }).then((response) => {
                dispatch({
                    type: DOCUMENT_UPLOAD_SUCCESS,
                    requirementId,
                    documentId: document.id
                });

                return response;
            }).catch((response) => {
                dispatch({
                    typ: DOCUMENT_UPLOAD_FAILED,
                    requirementId,
                    documentId: document.id
                });

                return response;
            });

        });
    };
}
