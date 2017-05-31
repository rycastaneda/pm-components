import {
    RECEIVE_DOCUMENTS
} from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function requirements(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_DOCUMENTS: return receiveRequirements(state, action);
        default:
            return state;
    }
}

function receiveRequirements(state, action) {
    action.documents.included && action.documents.included.map((include) => {
        if (include.type !== 'requested-items') {
            return;
        }

        state.byId[include.id] = {
            ...include.attributes,
            id: include.id,
            documentIds: []
        };
        state.allIds.push(include.id);
    });

    action.documents.data.map((doc) => {
        doc.relationships.requesteditems.data.map((item) => {
            state.byId[item.id].documentIds.push(doc.id);
        });
    });

    return Object.assign({}, state);
}
