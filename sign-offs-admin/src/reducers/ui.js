import * as actions from '../constants';

const INITIAL_STATE = { 
    isReadOnly: true,
    currentStaffId: 0,
    sectionModalId: null
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            return { 
                ...state,
                isReadOnly: action.isReadOnly,
                currentStaffId: action.staffId
            };
        case actions.TOGGLE_MANAGE_SECTION_MODAL:
            return {
                ...state,
                sectionModalId: action.sectionId
            };
    }

    return state;
}