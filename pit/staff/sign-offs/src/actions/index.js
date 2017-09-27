import mockSections from '../mocks/sections.json';
import * as actions from '../constants';
import axios from 'axios';

export function fetchSections() {
    return (dispatch) => {
        dispatch({
            type: actions.FETCH_SECTIONS
        });
        // console.log("FETCH_SECTIONS, RECEIVE_SECTIONS", FETCH_SECTIONS, RECEIVE_SECTIONS); // eslint-disable-line no-console, quotes
        // axios.get('/actions')
        return new Promise(resolve => resolve(mockSections)).then((sections) => {
            dispatch({
                type: actions.RECEIVE_SECTIONS,
                sections
            });
        });
    };
}

export function toggleSection(sectionId) {
    return {
        type: actions.TOGGLE_SECTION,
        sectionId
    };
}

export function switchTab(sectionId, currentTab) {
    return {
        type: actions.SWITCH_TAB,
        sectionId,
        currentTab
    };
}

export function toggleStatus(sectionId, status) {
    return {
        type: actions.TOGGLE_STATUS,
        sectionId,
        status
    };
}

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

export function submitComment(commentId, comment) {
    return (dispatch) => {
        dispatch({
            type: actions.SUBMITTING_COMMENT,
            commentId
        });

        let request, 
            newComment = {
                comment
            };

        if (commentId) {
            newComment.commentId = commentId;
            // request = axios.put('/comment', data);
        } else {
            // request = axios.post('/comment', data);
        }

        request = axios.all([]);

        return request.then(() => {
            dispatch({
                type: actions.SUBMITTED_COMMENT,
                commentId: commentId,
                comment: comment
            });
        });
    };
}