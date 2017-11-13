import * as actions from '../constants';

const INITIAL_STATE = {
    isReadOnly: true,
    currentStaffId: 0,
    sectionModalId: null,
    organizationId: null,
    preferredSupplierId: null,
    supplierUserId: null
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            return {
                ...state,
                isReadOnly: action.isReadOnly,
                currentStaffId: +action.currentStaffId,
                organizationId: action.organizationId,
                preferredSupplierId: action.preferredSupplierId,
                supplierUserId: action.supplierUserId
            };
        case actions.TOGGLE_MANAGE_SECTION_MODAL:
            return {
                ...state,
                sectionModalId:
                    +state.sectionModalId === +action.sectionId
                        ? null
                        : +action.sectionId
            };
    }

    return state;
}
