import * as actionTypes from './actionsTypes';
import { initSupplierInteractions } from '../../actions/apiActions';

export const updateChangeSearchKey = (searchKey) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_SEARCH_UPDATE,
        searchKey,
    };
};

export const updateFilterInteractionTypeChange = interactionTypeSelected => (dispatch) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_STATUS_CHANGE,
        interactionTypeSelected,
    });
    dispatch(initSupplierInteractions());
};

export const submitFilterNormal = () => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SUBMIT_NORMAL,
    };
};

export const submitFilterAdvanced = () => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SUBMIT_ADVANCED,
    };
};

export const toggleFilter = () => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SHOW_FILTER_TOGGLE,
    };
};
