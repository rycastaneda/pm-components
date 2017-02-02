import {
    RECEIVE_REQUIREMENTS,
    DOCUMENT_REMOVING
} from '../constants';

const INITIAL_STATE = {
    byId: {}, // array of document groups
    allIds: []
};

export function requirementsDocuments(state = INITIAL_STATE, action) {
    let index;

    switch (action.type) {
        case RECEIVE_REQUIREMENTS: 
            action.requirements.data.map((requirement) => {
                state.byId[requirement.id] = requirement.attributes;
                state.allIds.push(requirement.id);
            });

            return Object.assign({}, state);
        case DOCUMENT_REMOVING:
            index = state.byId[action.requirement_id].documentIds.indexOf(action.requirement_id);

            if (index > -1) {
                state.byId[action.requirement_id].documentIds.splice(index, 1);
            }

            return Object.assign({}, state);
        default:
            return state;
    }
}
