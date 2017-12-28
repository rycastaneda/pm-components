import * as actionTypes from './actionTypes';

export const onRowsPerPageUpdate = (rows) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SHOW_ROWS_CHANGE_UPDATE,
        rows,
    };
};
