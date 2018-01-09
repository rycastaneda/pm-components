import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: false
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_COMMENT:
            state.isLoading = true;
            return { ...state };
        case actions.RECEIVE_COMMENT:
            return receiveComment(state, action);
    }

    return state;
}

function receiveComment(state, action) {
    action.comments.data.map(comment => {
        state.byId[comment.id] = {
            id: comment.id,
            ...comment.attributes,
            staffId: comment.relationships.staff.data.id
        };

        state.allIds.push(comment.id);
    });

    return { ...state, isLoading: false };
}
