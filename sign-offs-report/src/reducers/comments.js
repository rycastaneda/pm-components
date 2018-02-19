import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receiveComment(state, action);
    }

    return state;
}

function receiveComment(state, action) {
    const byId = {};
    const allIds = [];
    action.assignments.included &&
        action.assignments.included
            .filter(include => include.type === 'compliance-comments')
            .map(comment => {
                byId[comment.id] = {
                    id: comment.id,
                    text: comment.attributes.text,
                    created_at: comment.attributes.created_at.date,
                    staffId: comment.relationships.staff.data.id
                };

                allIds.push(comment.id);
            });

    return {
        byId,
        allIds
    };
}
