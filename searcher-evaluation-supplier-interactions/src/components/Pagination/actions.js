import * as actionTypes from './actionsTypes';

export const paginationInit = supplierId => (dispatch, getState) => {

    const links =
        Object.keys(getState().supplierInteractions.meta).length > 0
            ? getState().supplierInteractions.meta[
                  `/preferred-suppliers/${supplierId}/interactions`
              ].links
            : {};

    const pages =
        Object.keys(getState().supplierInteractions.meta).length > 0
            ? getState().supplierInteractions.meta[
                  `/preferred-suppliers/${supplierId}/interactions`
              ].meta.pagination
            : {};

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_INIT_PAGES,
        links,
        pages,
    });
};
