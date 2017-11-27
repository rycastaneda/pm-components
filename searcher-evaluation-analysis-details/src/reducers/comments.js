import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveComment(state, action);
    }

    return state;
}

function receiveComment(state, action) {
    const byId = {};
    const allIds = [];

    action.comments.data.map(comment => {
        byId[comment.id] = {
            id: comment.id,
            ...comment.attributes
        };
        allIds.push(comment.id);
    });

    return {
        byId,
        allIds
    };
}
