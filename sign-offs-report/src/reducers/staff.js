import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: false
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_STAFF:
            state.isLoading = true;
            return { ...state };
        case actions.RECEIVE_STAFF:
            return receiveStaff(state, action);
    }

    return state;
}

function receiveStaff(state, action) {
    action.staff.data.map(staff => {
        state.byId[staff.id] = {
            ...staff.attributes
        };

        state.allIds.push(staff.id);
    });

    return { ...state, isLoading: false };
}
