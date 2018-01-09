import { CALL_API } from '../middleware/api';
import { baseUrl } from '../utils/reduxApiUtils';

export const fetchInteractions = preferredSupplier => (dispatch) => {
    // const { maxRowsSelected } = getState().supplierInteractions;
    const endpoint = baseUrl
        .segment('/preferred-suppliers/:supplier')
        .segment('/interactions')
        .param('supplier', preferredSupplier)
        .param('per_page', 1)
        .toString();

    dispatch({
        [CALL_API]: {
            endpoint,
        },
    });
};

export function applyPerPage(preferredSupplier) {

    return {
        [CALL_API]: {
            endpoint:
                `/preferred-suppliers/${preferredSupplier}/interactions?per_page=15`,
        },
    };
}
