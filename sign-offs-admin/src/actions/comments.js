import * as actions from '../constants';
import axios from 'axios';
import { format } from 'date-fns';

export function toggleCommentBox(sectionId) {
    return {
        type: actions.TOGGLE_COMMENT_BOX,
        sectionId
    };
}

export function toggleCommentEdit(commentId) {
    return {
        type: actions.TOGGLE_COMMENT_EDIT,
        commentId
    };
}

export function deleteComment(sectionId, commentId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.DELETED_COMMENT,
                commentId,
                sectionId
            });
        });
    };
}

export function submitEditComment(sectionId, commentId, comment) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId
        });

        let newComment = {
            comment
        };

        newComment.commentId = commentId;

        // TODO: API endpoint
        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.SUBMITTED_EDIT_COMMENT,
                sectionId,
                commentId: commentId,
                comment: comment,
                date: format(new Date(), 'MM-DD-YYYY HH:m a')
            });
        });
    };
}

export function submitNewComment(sectionId, comment) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        let newComment = {
            staffId: 100, // replace with current staff id
            staffName: 'Tester',
            commentId: getState().comments.allIds.length + 1, // replace with actual commentId from backend in 
            comment
        };

        // TODO: API endpoint
        return axios.post('/anything', newComment).then(() => {
            dispatch({
                type: actions.SUBMITTED_NEW_COMMENT,
                sectionId,
                ...newComment,
                date: format(new Date(), 'MM-DD-YYYY HH:m a')
            });
        });
    };
}
