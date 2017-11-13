import * as actions from '../constants/ActionTypes';
import axios from 'axios';
import { format } from 'date-fns';

export function fetchAssignments(parameters, forDownload) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_ASSIGNMENTS,
            ...parameters
        });

        const keywordUrl = `keyword=${parameters.keyword}`;
        const fields =
            'fields[compliance-assignments]=section_id,preferred_supplier_id,supplier,panels,section,assignee,last_updated,comments';
        const orderBy = `orderBy[${parameters.orderByField}]=${parameters.orderByDirection}`;
        const filterUrl = Object.keys(parameters.filters)
            .map(field => {
                return `filters[${field}]=${parameters.filters[field]}`;
            })
            .join('&');
        const pageUrl = `page=${parameters.page}&perPage=${parameters.perPage}`;

        const endpoint = `/compliance/reports?${[
            keywordUrl,
            fields,
            orderBy,
            filterUrl,
            pageUrl
        ].join('&')}`;

        if (forDownload) {
            return downloadBlob(
                endpoint,
                `Sign Offs Report - ${format(new Date(), 'MMMM D, YYYY')}.csv`,
                () => {
                    dispatch({
                        type: actions.DOWNLOADED_ASSIGNMENTS
                    });
                }
            );
        }

        return axios.get(endpoint).then(response => {
            return dispatch({
                type: actions.RECEIVE_ASSIGNMENTS,
                assignments: response.data
            });
        });
    };
}

export function toggleCommentModal(assignmentId) {
    return {
        type: actions.TOGGLE_COMMENT_MODAL,
        assignmentId
    };
}

export function fetchStaff() {
    return dispatch => {
        dispatch({
            type: actions.FETCH_STAFF
        });

        return axios.get(`/staff`).then(response => {
            dispatch({
                type: actions.RECEIVE_STAFF,
                staff: response.data
            });
        });
    };
}

export function fetchComments(assignmentId, sectionId, preferredSupplierId) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_COMMENT
        });

        return axios
            .get(`/compliance/comments/${sectionId}/${preferredSupplierId}`)
            .then(response => {
                dispatch({
                    type: actions.RECEIVE_COMMENT,
                    assignmentId,
                    comments: response.data
                });
            });
    };
}

function downloadBlob(url, filename, callback) {
    var downloader = axios.create({
        baseURL: axios.defaults.baseURL
    });
    downloader.defaults.headers.common['Authorization'] =
        axios.defaults.headers.common['Authorization'];
    downloader
        .request({
            method: 'get',
            url,
            data: {},
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        })
        .then(response => {
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
        });
}
