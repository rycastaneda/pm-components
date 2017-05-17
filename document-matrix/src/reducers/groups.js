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
            action.requirements.included.map((doc) => {
                if (doc.type === 'document-group') {
                    state.byId[doc.id] = Object.assign({}, doc.attributes, {
                        id: doc.id
                    });
                    state.allIds.push(doc.id);

                } else if (doc.type === 'quote-documents') {
                    if (state.byId[doc.relationships.groups.data.id].documentIds) {
                        state.byId[doc.relationships.groups.data.id].documentIds.push(doc.id);
                    } else {
                        state.byId[doc.relationships.groups.data.id].documentIds = [doc.id];
                    }

                }
            });

            return Object.assign({}, state);

        default:
            return state;
    }
}
