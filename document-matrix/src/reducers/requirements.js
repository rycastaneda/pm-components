import {
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    byId: {

    }, // array of document groups
    allIds: []
};

export function requirements(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_REQUIREMENTS: return receiveRequirements(state, action);
        default:
            return state;
    }
}

function receiveRequirements(state, action) {
    action.requirements.data && action.requirements.data.map((requirement) => {
        state.byId[requirement.id] = {
            ...requirement.attributes,
            id: requirement.id,
            hasDocuments: !!requirement.relationships.quoteDocuments.data.length
        };
        state.allIds.push(requirement.id);
    });

    return Object.assign({}, state);
}
