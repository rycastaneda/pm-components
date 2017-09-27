import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.included
        .filter(include => include.type === 'staff')
        .map((staff) => {
            byId[staff.id] = {
                id: staff.id,
                ...staff.attributes
            };
            return staff;
        });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds
    };
}