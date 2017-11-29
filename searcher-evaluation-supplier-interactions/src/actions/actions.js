import axios from 'axios';
import * as actionTypes from '../constants/ActionTypes';

export const fetchSupplierInteractions = (apiUrl) => (dispatch) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START,
    });

    axios
        .get(apiUrl)
        .then((response) => {
            // might normalise response here
            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_SUCCESS,
                interactions: response,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
