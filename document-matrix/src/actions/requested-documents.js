import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS,
    TOGGLE_LOADING,
    REQUEST_FAILED
} from '../constants';
import axios from 'axios';

export function fetchRequirements(quoteId, userType) {
    return (dispatch) => {
        dispatch({
            type: FETCH_REQUIREMENTS,
            quoteId,
            userType
        });

        axios.get(`/${userType}-quote-requests/${quoteId}/documents?include=requesteditems,groups,revisions`)
            .then((response) => {
                return dispatch({
                    type: RECEIVE_REQUIREMENTS,
                    documents: response.data
                });
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
            window.navigator.msSaveOrOpenBlob(response.data, filename);
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
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents?filters[group_id]=${groupId}`,
            title.toLowerCase().split(' ').join('-'),
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
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents`,
            `QR-${quoteId}`,
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
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents?filters[requested_item_id]=${requestedItemId}`,
            `QR-${requestedItemId}-${quoteId}`,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}
