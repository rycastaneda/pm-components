import {
    FETCH_DOCUMENTS,
    RECEIVE_DOCUMENTS,
    RECEIVE_MATCHED_ITEMS,
    TOGGLE_LOADING,
    REQUEST_FAILED
} from '../constants';
import axios from 'axios';

export function fetchRequirements(quoteId, userType) {
    return (dispatch) => {
        dispatch({
            type: FETCH_DOCUMENTS,
            quoteId,
            userType
        });

        let endpoint = `/${userType}-quote-requests/${quoteId}/documents?include=requesteditems,groups,revisions&filters[locked_in]=1`;

        if (userType === 'supplier') {
            endpoint = `/${userType}-quote-requests/${quoteId}/documents?include=requesteditems,groups,revisions&filters[locked_in]=1`;
        }

        axios.get(endpoint)
            .then((response) => {
                dispatch({
                    type: RECEIVE_DOCUMENTS,
                    documents: response.data,
                    userType
                });

                if (userType === 'supplier') {
                    return axios.get(`/${userType}-quote-requests/${quoteId}/matched-items?include=requestedItem`)
                        .then((response) => {
                            dispatch({
                                type: RECEIVE_MATCHED_ITEMS,
                                matchedItem: response.data
                            });
                        });
                }
            });
    };
}

function downloadBlob(url, filename, callback, error) {
    var downloader = axios.create({
        baseURL: url
    });

    downloader.defaults.headers.common['Authorization'] = axios.defaults.headers.common['Authorization'];

    downloader.request({
        method:'get',
        url,
        data:{},
        responseType:'blob',
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    }).then((response) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let data = response.data;
            window.navigator.msSaveOrOpenBlob(data, filename);
            return callback();
        }

        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(response.data); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        callback();
    }).catch(error);
}

export function downloadDocument(documentId) {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;
        const filename = getState().documents.byId[documentId].name;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents/${documentId}`,
            filename,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}

export function downloadDocumentGroup(groupId) {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;
        const title = getState().groups.byId[groupId].title;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents?filters[group_id]=${groupId}${userType === 'supplier' ? '&filters[matched_item_only]=1' : ''}`,
            `${title.toLowerCase().split(' ').join('-')}.zip`,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}

export function downloadDocumentGroups() {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents${userType === 'supplier' ? '?filters[matched_item_only]=1' : ''}`,
            `QR-${quoteId}.zip`,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}

export function downloadRequestedItemDocuments(requestedItemId) {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents?filters[requested_item_id]=${requestedItemId}${userType === 'supplier' ? '&filters[matched_item_only]=1' : ''}`,
            `QR-${requestedItemId}-${quoteId}.zip`,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}
