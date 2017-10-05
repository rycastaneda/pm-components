import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

export function questions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        default:
            return state;
    }
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.included
        .filter(include => include.type === 'question')
        .map((include) => {
            byId[include.id] = {
                ...include.attributes
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

