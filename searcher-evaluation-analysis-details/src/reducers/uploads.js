import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function uploads(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveUploads(state, action);
    }

    return state;
}

function receiveUploads(state, action) {
    const { byId, allIds } = state;

    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'uploads')
            .map(upload => {
                byId[upload.id] = {
                    id: upload.id,
                    title: upload.attributes.original_name,
                    ...upload.attributes
                };

                allIds.push(upload.id);
            });
    }

    return {
        byId,
        allIds
    };
}
