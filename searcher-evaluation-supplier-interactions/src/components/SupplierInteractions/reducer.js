import merge from 'lodash/merge';
import * as actionTypes from './actionTypes';

const initialState = {
    interactions: {},
    meta: {},
    currentSupplierId: '',
    urlParams: '',
    endpoint: '',
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionTypes.SUPPLIER_INTERACTIONS_REQUEST_SUCCESS:
            return merge(
                {},
                state,
                action.response
            );

        case actionTypes.SUPPLIER_INTERACTIONS_REQUEST_DONE:
            return {
                ...state,
                isLoading: false,
            };

        case actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_SUPPLIER:
            return {
                ...state,
                currentSupplierId: action.supplierId,
            };

        case actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_ENDPOINT:
            return {
                ...state,
                endpoint: action.endpoint,
            };

        case actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_CURRENT_URL_PARAMS:
            return {
                ...state,
                urlParams: action.urlParams,
            };

        default:
            return state;
    }
};

export default reducer;
