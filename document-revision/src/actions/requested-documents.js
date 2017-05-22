import {
    FETCH_REVISIONS,
    RECEIVE_REVISIONS,
    TOGGLE_LOADING,
    REQUEST_FAILED
} from '../constants';
import axios from 'axios';

export function fetchRevisions(quoteId, documentId, userType) {

    return (dispatch) => {
        dispatch({
            type: FETCH_REVISIONS,
            quoteId,
            documentId,
            userType
        });

        axios.get(`/${userType}-quote-requests/${quoteId}/documents/${documentId}?include=revisions`)
            .then((response) => {
                return dispatch({
                    type: RECEIVE_REVISIONS,
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

export function downloadRevision(documentId) {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;
        const filename = getState().revisions.byId[documentId].name;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents/${documentId}`,
            filename,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}

export function downloadRevisions(documentId) {
    return (dispatch, getState) => {
        const { quoteId, userType } = getState().ui;
        const filename = getState().revisions.byId[documentId].name;

        dispatch({ type: TOGGLE_LOADING });

        downloadBlob(
            axios.defaults.baseURL + `/${userType}-quote-requests/${quoteId}/documents/${documentId}`,
            filename,
            () => dispatch({ type: TOGGLE_LOADING }),
            () => dispatch({ type: REQUEST_FAILED })
        );
    };
}
