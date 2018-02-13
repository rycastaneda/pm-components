import * as actions from '../constants';
const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function uploads(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveUploads(state, action);
        default:
            return state;
    }
}

function receiveUploads(state, action) {
    const { byId, allIds } = state;

    action.sections.included
        .filter(include => include.type === 'uploads')
        .map(upload => {
            byId[upload.id] = {
                id: upload.id,
                ...upload.attributes
            };
            allIds.push(upload.id);
        });

    return {
        byId,
        allIds
    };
}
