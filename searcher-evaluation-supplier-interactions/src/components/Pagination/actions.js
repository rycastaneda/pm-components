import * as actionTypes from './actionsTypes';
import { initSupplierInteractions } from '../../actions/apiActions';

export const paginationInit = () => (dispatch, getState) => {
    const { urlParams, endpoint } = getState().supplierInteractions;
    const pages =
        Object.keys(getState().supplierInteractions.meta).length > 0
            ? getState().supplierInteractions.meta[endpoint][urlParams].meta.pagination
            : {};

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_INIT_PAGES,
        pages,
    });
};

export const onPageUpdateChange = page => (dispatch) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_ON_PAGE_UPDATE_CHANGE,
        pageSelected: page.selected + 1,
    });
    dispatch(initSupplierInteractions());
};

export const onRowsPerPageUpdate = evt => (dispatch) => {
    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_SHOW_ROWS_CHANGE_UPDATE,
        rows: evt.target.value,
    });
    dispatch(initSupplierInteractions());
};
