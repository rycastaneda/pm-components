import * as actionTypes from './actionsTypes';
import * as PMDateRangeActiontypes from '../PMDateRange/actionsTypes';
import { initSupplierInteractions } from '../../actions/apiActions';

export const updateChangeSearchKey = (searchKey) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_SEARCH_UPDATE,
        searchKey,
    };
};

export const updateFilterInteractionTypeChange = interactionTypeSelected => (
    dispatch
) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_INTERACTION_TYPE,
        interactionTypeSelected,
    });
};

export const updateFilterInitiatedByChange = initiatedBySelected => (
    dispatch
) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_INITIATED_BY_CHANGE,
        initiatedBySelected,
    });
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

export const resetFilters = () => (dispatch) => {
    dispatch({
        type:
            PMDateRangeActiontypes.SUPPLIER_INTERACTIONS_FILTER_DATE_START_CHANGE,
        dateTimeStart: null,
    });
    dispatch({
        type:
            PMDateRangeActiontypes.SUPPLIER_INTERACTIONS_FILTER_DATE_END_CHANGE,
        dateTimeEnd: null,
    });
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_INTERACTION_TYPE,
        interactionTypeSelected: 'Any',
    });
    // reload the page with no filters
    dispatch(initSupplierInteractions());
};
