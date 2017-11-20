import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: false,
    needsFetching: true
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.RECEIVE_STAFF:
            return receiveStaff(state, action);
        case actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING:
            state.isLoading = !state.isLoading;
            return { ...state };
        case actions.SUBMITTED_NEW_COMMENT: // save staff upon new comment
            return receiveComment(state, action);
        case actions.TOGGLE_STAFF_LOADING:
            state.byId[action.staffId].isLoading = !state.byId[action.staffId]
                .isLoading;
            return { ...state };
        case actions.DELETED_STAFF_RESPONSE:
        case actions.CHANGE_STAFF_RESPONSE:
            state.byId[action.staffId].isLoading = false;
            return { ...state };
        case actions.ADDED_STAFF_RESPONSE:
            state.isLoading = false;
            state.byId[action.staffId].isLoading = false;
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};
    const allIds = [];
    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'staff')
            .map(staff => {
                byId[staff.id] = {
                    id: staff.id,
                    ...staff.attributes,
                    isLoading: false
                };
                allIds.push(staff.id);

                return staff;
            });
    }

    return {
        ...state,
        byId,
        allIds,
        needsFetching: true
    };
}

function receiveComment(state, action) {
    state.byId[action.staffId] = {
        id: action.staffId,
        first_name: action.firstName,
        last_name: action.lastName
    };

    state.allIds.push(action.staffId);

    return { ...state };
}

function receiveStaff(state, action) {
    const byId = {};
    action.staffs.data
        .filter(include => include.type === 'staff')
        .map(staff => {
            byId[staff.id] = {
                id: staff.id,
                ...staff.attributes,
                isLoading: false
            };
            return staff;
        });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds,
        needsFetching: false
    };
}
