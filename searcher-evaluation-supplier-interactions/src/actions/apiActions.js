import { CALL_API } from '../middleware/api';
import { baseUrl } from '../utils/reduxApiUtils';
import normalize from 'json-api-normalizer';
import axios from 'axios';
import * as actionTypes from '../components/SupplierInteractions/actionTypes';
import { paginationInit } from '../components/Pagination/actions';
// /import api from '../../../shared/api.config';

export const fetchInteractions = () => (dispatch, getState) => {
    const { maxRowsSelected, pageSelected } = getState().pagination;
    const { currentSupplierId } = getState().supplierInteractions;
    const endpoint = baseUrl
        .segment('/preferred-suppliers/:supplier')
        .segment('/interactions')
        .param('supplier', currentSupplierId)
        .param('per_page', maxRowsSelected)
        .query({
            page: pageSelected,
        })
        .toString();

    console.log('params ', endpoint.slice(endpoint.indexOf('?')));

    dispatch({
        [CALL_API]: {
            endpoint,
        },
    });

    dispatch({
        type:
            actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_CURRENT_URL_PARAMS,
        urlParams: endpoint.slice(endpoint.indexOf('?')),
    });
};

export const initSupplierInteractions = () => (dispatch, getState) => {
    const { maxRowsSelected, pageSelected } = getState().pagination;
    const { currentSupplierId } = getState().supplierInteractions;
    const apiEndpoint = baseUrl
        .segment('/preferred-suppliers/:supplier')
        .segment('/interactions')
        .param('supplier', currentSupplierId)
        .param('per_page', maxRowsSelected)
        .query({
            page: pageSelected,
        })
        .toString();

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START,
    });

    axios
        .get(apiEndpoint)
        .then((response) => {
            console.log('response: ', response);
            console.log('response: ', apiEndpoint);
            const normalisedResponse = Object.assign(
                {},
                normalize(response.data, { endpoint: apiEndpoint, filterEndpoint: false })
            );
            console.log('normalised response', normalisedResponse);

            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_SUCCESS,
                response: normalisedResponse,
            });

            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_DONE,
            });

            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_CURRENT_URL_PARAMS,
                urlParams: apiEndpoint.slice(apiEndpoint.indexOf('?'))
            });

            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_ENDPOINT,
                endpoint: apiEndpoint.slice(0, apiEndpoint.indexOf('?'))
            });

            dispatch(paginationInit());

        })
        .catch((error) => {
            throw error;
        });
};

