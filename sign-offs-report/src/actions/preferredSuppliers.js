import * as actions from '../constants';
import axios from 'axios';
import { format } from 'date-fns';

export function fetchPreferredSuppliers(parameters, forDownload) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_PREFERRED_SUPPLIERS,
            ...parameters
        });

        const { status, assigned_to, supplierId } = parameters.filters;
        const keywordUrl = `filter[keyword]=${parameters.keyword}`;
        const sort = `sort=${parameters.orderByDirection === 'desc'
            ? '-'
            : ''}${parameters.orderByField}`;
        const pageUrl = `page=${parameters.page}&per_page=${parameters.perPage}`;
        const includes = [
            'panels.complianceSections.assignments',
            'panels.complianceSections.comments',
            'staff'
        ];

        const endpoint = `/preferred-suppliers?include=${[
            includes.join(','),
            parameters.keyword ? keywordUrl : '',
            sort,
            status ? 'filter[status]=' + status : '',
            assigned_to ? 'filter[assigned_to]=' + assigned_to : '',
            supplierId ? 'filter[preferred_supplier_id]=' + supplierId : '',
            'filter[has_compliance]=1',
            pageUrl
        ]
            .filter(parts => parts)
            .join('&')}`;

        if (forDownload) {
            return downloadBlob(
                '/preferred-suppliers/export-compliance-report',
                `Sign Offs Report - ${format(new Date(), 'MMMM D, YYYY')}.csv`,
                () => {
                    dispatch({
                        type: actions.DOWNLOADED_PREFERRED_SUPPLIERS
                    });
                }
            );
        }

        return axios.get(endpoint).then(response => {
            return dispatch({
                type: actions.RECEIVE_PREFERRED_SUPPLIERS,
                assignments: response.data
            });
        });
    };
}

export function getSuppliers() {
    return dispatch => {
        axios.get('/preferred-suppliers').then(response => {
            return dispatch({
                type: actions.RECEIVE_SUPPLIERS,
                assignments: response.data
            });
        });
    };
}

export function toggleCommentModal(sectionId) {
    return {
        type: actions.TOGGLE_COMMENT_MODAL,
        sectionId
    };
}

export function toggleSupplierRow(supplierId) {
    return {
        type: actions.TOGGLE_SUPPLIER_ROW,
        supplierId
    };
}

export function fetchStaff() {
    return dispatch => {
        dispatch({
            type: actions.FETCH_STAFF
        });

        return axios
            .get('/staff?filter[pitRoles]=1,2,3&filter[is_deleted]=0')
            .then(response => {
                dispatch({
                    type: actions.RECEIVE_STAFF,
                    staff: response.data
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
