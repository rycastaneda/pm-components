import { baseUrl } from '../utils/reduxApiUtils';
import normalize from 'json-api-normalizer';
import axios from 'axios';
import * as actionTypes from '../components/SupplierInteractions/actionTypes';
import { paginationInit } from '../components/Pagination/actions';

export const initSupplierInteractions = () => (dispatch, getState) => {
    const { maxRowsSelected, pageSelected } = getState().pagination;
    const { currentSupplierId } = getState().supplierInteractions;
    const { interactionTypeSelected } = getState().interactionsFilter;

    const request = baseUrl
        .segment('/preferred-suppliers/:supplier')
        .segment('/interactions')
        .param('supplier', currentSupplierId)
        .param('per_page', maxRowsSelected);

    const apiEndpoint =
        interactionTypeSelected !== 'Any'
            ? request
                .query('page', pageSelected)
                .query('filter[type]', interactionTypeSelected)
                .toString()
            : request.query({ page: pageSelected }).toString();

    console.log('endpoin: -> ', apiEndpoint);

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START,
    });

    axios
        .get(apiEndpoint)
        .then((response) => {
            const normalisedResponse = Object.assign(
                {},
                normalize(response.data, {
                    endpoint: apiEndpoint,
                    filterEndpoint: false,
                })
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
                type:
                    actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_CURRENT_URL_PARAMS,
                urlParams: apiEndpoint.slice(apiEndpoint.indexOf('?')),
            });

            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_ENDPOINT,
                endpoint: apiEndpoint.slice(0, apiEndpoint.indexOf('?')),
            });

            dispatch(paginationInit());
        })
        .catch((error) => {
            throw error;
        });
};
