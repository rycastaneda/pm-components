import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.SUBMITTED_NEW_COMMENT: // save staff upon new comment
            return receiveComment(state, action);
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

function receiveComment(state, action) {
    state.byId[action.staffId] = {
        id: action.staffId,
        name: action.staffName
    };
    
    state.allIds.push(action.staffId);

    return { ...state };
}