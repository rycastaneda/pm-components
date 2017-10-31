import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    needsFetching: true
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.RECEIVE_STAFF:
            return receiveStaff(state, action);
        case actions.ASSIGN_STAFF:
            state.byId[action.staffId].total_incomplete_signoff += 1;
            return { ...state };
        case actions.REMOVE_STAFF:
            state.byId[action.staffId].total_incomplete_signoff -= 1;
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};
    const allIds = [];

    action.sections.included
        .filter(include => include.type === 'staff')
        .map(staff => {
            let attributes = staff.attributes;
            byId[staff.id] = {
                id: staff.id,
                name: `${attributes.first_name} ${attributes.last_name}`,
                ...attributes
            };
            allIds.push(staff.id);
        });

    return {
        ...state,
        byId,
        allIds,
        needsFetching: true
    };
}

function receiveStaff(state, action) {
    const byId = {};
    const allIds = [];

    action.staffs.data.map(staff => {
        let attributes = staff.attributes;
        byId[staff.id] = {
            id: staff.id,
            name: `${attributes.first_name} ${attributes.last_name}`,
            ...attributes
        };
        allIds.push(staff.id);
    });

    return {
        byId,
        allIds,
        needsFetching: false
    };
}
