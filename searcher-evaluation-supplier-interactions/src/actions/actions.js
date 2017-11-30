import axios from 'axios';
import * as actionTypes from '../constants/ActionTypes';

export const fetchSupplierInteractions = (apiUrl) => (dispatch) => {

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START,
    });

    console.log(apiUrl)

    axios
        .get(apiUrl)
        .then((response) => {
            // might normalise response here
            console.log("response: ", response);
            dispatch({
                type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_SUCCESS,
                interactions: response.data.interactions,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const testAction = (paramBool) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_REQUEST_START,
        paramBool,
    }
}