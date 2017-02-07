import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    RECEIVE_DOC_REQUIREMENTS,
    DOCUMENT_UPLOAD_FAILED,
    FETCH_FAILED,
    DOCUMENT_REMOVING
} from '../constants';
import axios from 'axios';

export function fetchRequirements(quoteId, itemId) {
    return (dispatch) => {
        dispatch({
            type: FETCH_REQUIREMENTS,
            quoteId,
            itemId
        });

        axios.get(`/supplier-quote-requests/${quoteId}/requested-items?include=complianceDocuments`)
            .then((response) => {
                axios.get(`/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents`)
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

export function removeDocument(quoteId, itemId, requirementId, docId) {
    return (dispatch) => {
        axios.delete(`/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents/${docId}`)
            .then(() => {
                dispatch({
                    type: DOCUMENT_REMOVING,
                    requirementId,
                    docId
                });
            });

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

            if (requirementId !== 'additional') {
                docData.append('requested_document_id', requirementId);
            }

            docData.append('document', document);

            return axios.post(`/supplier-quote-requests/${quoteId}/matched-items/${itemId}/documents`, docData, {
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
