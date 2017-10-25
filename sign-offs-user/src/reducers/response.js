import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

export function response(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.CHANGE_STAFF_RESPONSE:
            state.byId[action.responseId].status = action.status;
            return { ...state }; 
        default:
            return state;
    }
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.included
        .filter(include => include.type === 'sign-off')
        .map((include) => {
            byId[include.id] = {
                status: include.attributes.status_label,
                staffId: include.relationships.assignedStaff.data.id
            };
            return include;
        });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds
    };
}

