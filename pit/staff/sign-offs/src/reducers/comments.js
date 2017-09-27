import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: [],
    addingNewComment: false
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.TOGGLE_COMMENT_EDIT:
            state.byId[action.commentId].isEditing = !state.byId[action.commentId].isEditing;
            return { ...state };
        case actions.SUBMITTING_COMMENT: 
            return submitComment(state, action);
        case actions.SUBMITTED_COMMENT:
            return submittedComment(state, action);
        default:
            return state;
    }
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.included
        .filter(include => include.type === 'comment')
        .map((include) => {
            console.log("include", include); // eslint-disable-line no-console, quotes
            byId[include.id] = {
                ...include.attributes,
                isEditing: false,
                isLoading: false
            };
            return include;
        });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds
    };
}

function submitComment(state, action) {
    if (action.commentId) { // user is editing a comment
        state.byId[action.commentId].isEditing = true;
        state.byId[action.commentId].isLoading = true;
        state.byId[action.commentId].comment = action.comment;
    } else {
        state.addingNewComment = true;
    } 

    return { ...state };
}

function submittedComment(state, action) {
    let comment = state.byId[action.commentId];

    if (comment) { 
        comment.isEditing = false;
        comment.isLoading = false;
        comment.comment = action.comment;
    } else {
        state.byId[action.commentId] = {
            isEditing: false,
            isLoading: false,
            comment: action.comment
        };

        state.allIds.push(action.commentId);
        state.addingNewComment = false;
    }

    return { ...state };
}