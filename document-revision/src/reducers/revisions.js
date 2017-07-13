import {
    RECEIVE_REVISIONS
} from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: {}
};

export function revisions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_REVISIONS:
            return receiveRevisions(state, action);
        default:
            return state;
    }
}

function receiveRevisions(state, action) {
    let counter = 1;
    let revisionCount = action.documents.included.length;

    state.byId[action.documents.data.attributes.upload_id] = {
        ...action.documents.data.attributes,
        id: action.documents.data.attributes.upload_id,
        status: 'Current Revision',
        number: revisionCount
    };

    state.allIds = [action.documents.data.attributes.upload_id];

    action.documents.included.map((revision) => {
        state.byId[revision.id] = {
            ...revision.attributes,
            id: revision.id,
            created_at: revision.attributes.created_at,
            status: counter === revisionCount ? 'Original' : 'Superceded',
            number: revisionCount - counter
        };

        counter++;

        state.allIds.push(revision.id);
    });

    return Object.assign({}, state);
}
