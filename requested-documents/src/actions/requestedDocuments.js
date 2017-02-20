import {
    REQUEST_DOCUMENTS,
    RECEIVE_DOCUMENTS,
    RECEIVE_SUGGESTIONS_DOCUMENTS,
    UPDATE_QUOTE_ID,
    UPDATED_CHECKBOX_VALUE,
    UPDATING_STATUS,
    ADD_NEW_DOCUMENT
} from '../constants/ActionTypes';

import axios from 'axios';
import { updateInput } from '../actions/documentSuggestions';

export function getDocuments() {
    return (dispatch, getState) => {
        dispatch(requestDocuments());
        const quoteId = getState().requestedDocuments.quoteId;
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;

        return axios.get(`/searcher-compliance-doc-types`)
            .then((response) => {
                let complianceDocs = response.data.data;
                window.console.log(complianceDocs);

                axios.get(`/searcher-quote-requests/${quoteId}/requested-items/${itemId}?include=quoteRequestedDocuments`)
                    .then((response) => {
                        let complianceDocsSearcher = response.data.included;

                        let complianceDocsSearcherIds = complianceDocsSearcher.map(function(complianceDoc) {
                            return complianceDoc.attributes.compliance_document_type_id;
                        });

                        complianceDocs = complianceDocs.map(function(complianceDoc) {
                            if (complianceDocsSearcherIds.indexOf(parseInt(complianceDoc.id)) !== -1) {
                                complianceDoc.attributes.default_displayed = 1;
                                complianceDoc.attributes.checked = true;
                            }
                            return complianceDoc;
                        });

                        let docs = complianceDocs.filter(function(doc) {
                            return (doc.attributes.default_displayed === 1);
                        });

                        let suggestedDocs = complianceDocs.filter(function(doc) {
                            return (doc.attributes.default_displayed === 0);
                        });

                        dispatch(receiveSuggestionsDocuments(suggestedDocs));

                        return dispatch(receiveDocuments(docs));
                    });
            });
    };
}

export function updateCheckbox(checked, doc) {
    return (dispatch, getState) => {
        dispatch(updatingStatus(doc, true));

        const quoteId = getState().requestedDocuments.quoteId;
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;

        let updatedDocument = {
            data: [{
                type: 'searcher-compliance-document-types',
                id: doc.id
            }]
        };

        if (checked) {
            axios.post(`searcher-quote-requests/${quoteId}/requested-items/${itemId}/relationships/requested-documents`, updatedDocument).then((response) => {
                window.console.log(response);
                return dispatch({
                    type: UPDATED_CHECKBOX_VALUE,
                    id: doc.id,
                    value: checked,
                    updating: false
                });
            });
        } else {
            axios.delete(`searcher-quote-requests/${quoteId}/requested-items/${itemId}/relationships/requested-documents`, { data:updatedDocument }).then((response) => {
                window.console.log(response);
                return dispatch({
                    type: UPDATED_CHECKBOX_VALUE,
                    id: doc.id,
                    value: checked,
                    updating: false
                });
            });
        }
    };
}

export function addNewDocument() {
    return (dispatch, getState) => {
        const quoteId = getState().requestedDocuments.quoteId;
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;
        const documentSuggestions = getState().documentSuggestions;
        let newDocument = {};
        let updatedDocument = {};

        window.console.log(`ADD_NEW_DOCUMENT`, quoteId, itemId);

        if (documentSuggestions.selected.id) {
            updatedDocument = {
                data: [{
                    type: 'searcher-compliance-document-types',
                    id: documentSuggestions.selected.id,
                    attributes: { ...documentSuggestions.selected.attributes, checked: true }
                }]
            };

            axios.post(`searcher-quote-requests/${quoteId}/requested-items/${itemId}/relationships/requested-documents`, updatedDocument).then((response) => {
                window.console.log(response);
                dispatch(updateInput(''));

                return dispatch({
                    type: ADD_NEW_DOCUMENT,
                    document: updatedDocument.data[0]
                });
            });
        } else {
            newDocument = {
                data: {
                    type: 'searcher-compliance-document-types',
                    id: null,
                    attributes: { title: documentSuggestions.input }
                }
            };

            axios.post(`searcher-compliance-doc-types`, newDocument).then((response) => {
                updatedDocument = {
                    data: [{
                        type: 'searcher-compliance-document-types',
                        id: response.data.data.id,
                        attributes: { ...response.data.data.attributes, checked: true }
                    }]
                };

                axios.post(`searcher-quote-requests/${quoteId}/requested-items/${itemId}/relationships/requested-documents`, updatedDocument).then((response) => {
                    window.console.log(response);
                    dispatch(updateInput(''));

                    return dispatch({
                        type: ADD_NEW_DOCUMENT,
                        document: updatedDocument.data[0]
                    });
                });
            });
        }
    };
}

export function requestDocuments() {
    return {
        type: REQUEST_DOCUMENTS
    };
}

export function updateQuoteId(quoteId) {
    return {
        type: UPDATE_QUOTE_ID,
        quoteId
    };
}

export function updatingStatus(doc, updating) {
    return {
        type: UPDATING_STATUS,
        id: doc.id,
        updating
    };
}

export function receiveDocuments(documents) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_DOCUMENTS,
            response: documents
        });
    };
}

export function receiveSuggestionsDocuments(documents) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_SUGGESTIONS_DOCUMENTS,
            response: documents
        });
    };
}
