import * as actions from '../constants';

const INITIAL_STATE = {
    isReadOnly: true,
    currentStaffId: 0,
    error: null,
    preferredSupplierId: null,
    supplierUserId: null,
    panelId: null
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            return {
                ...state,
                isReadOnly: action.isReadOnly,
                currentStaffId: +action.staffId,
                preferredSupplierId: action.preferredSupplierId,
                supplierUserId: action.supplierUserId,
                panelId: action.panelId
            };
        case actions.API_ERROR:
            return {
                ...state,
                error: action.error
            };
    }

    return state;
}
