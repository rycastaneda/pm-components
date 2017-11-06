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
        case actions.SUBMITTED_NEW_COMMENT: // save staff upon new comment
            return receiveComment(state, action);
        case actions.TOGGLE_STAFF_LOADING:
            state.byId[action.staffId].isLoading = !state.byId[action.staffId]
                .isLoading;
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};

    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'staff')
            .map(staff => {
                byId[staff.id] = {
                    id: staff.id,
                    ...staff.attributes,
                    name: `${staff.attributes.first_name} ${staff.attributes
                        .last_name}`
                };
                return staff;
            });
    }

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds,
        needsFetching: false
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
