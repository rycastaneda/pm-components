import {
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function groups(state = INITIAL_STATE, action) {

    switch (action.type) {
        case RECEIVE_REQUIREMENTS:
            action.documents.included.map((include) => {
                if (include.type === 'document-group') {
                    state.byId[include.id] = Object.assign({}, include.attributes, {
                        id: include.id,
                        documentIds: []
                    });
                    state.allIds.push(include.id);

                }
            });

            action.documents.data.map((doc) => {
                let groupId = doc.relationships.groups.data.id;
                state.byId[groupId].documentIds.push(doc.id);
            });

            return Object.assign({}, state);

        default:
            return state;
    }
}
