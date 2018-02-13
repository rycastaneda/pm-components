import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.TOGGLE_COMMENT_EDIT:
            state.byId[action.commentId].isEditing = !state.byId[
                action.commentId
            ].isEditing;
            return { ...state };
        case actions.TOGGLE_COMMENT_LOADING:
            state.byId[action.commentId].isLoading = !state.byId[
                action.commentId
            ].isLoading;
            return { ...state };
        case actions.SUBMITTED_EDIT_COMMENT:
            return submittedEditComment(state, action);
        case actions.SUBMITTED_NEW_COMMENT:
            return submittedNewComment(state, action);
        case actions.DELETED_COMMENT:
            return deleteComment(state, action);
        default:
            return state;
    }
}

function receiveSections(state, action) {
    const byId = {};

    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'compliance-comments')
            .map(include => {
                byId[include.id] = {
                    text: include.attributes.text,
                    date: include.attributes.created_at.date,
                    staffId: include.relationships.staff.data.id,
                    isEditing: false,
                    isLoading: false
                };
                return include;
            });
    }

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds
    };
}

function submittedNewComment(state, action) {
    state.byId[action.commentId] = {
        isEditing: false,
        isLoading: false,
        text: action.comment,
        staffId: action.staffId,
        date: action.date
    };

    state.allIds.push(action.commentId);

    return { ...state };
}

function submittedEditComment(state, action) {
    let comment = state.byId[action.commentId];

    comment.isEditing = false;
    comment.isLoading = false;
    comment.text = action.comment;
    comment.date = action.date;

    return { ...state };
}

function deleteComment(state, action) {
    const ids = {};

    Object.keys(state.byId).map(commentId => {
        if (+commentId === action.commentId) {
            return;
        }

        ids[commentId] = state.byId[commentId];
    });

    let index = state.allIds.indexOf(action.commentId);
    state.allIds.splice(index, 1);

    return {
        ...state,
        byId: ids
    };
}
