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
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId
        });

        return axios.delete(`/compliance/comment/${commentId}`).then(() => {
            dispatch({
                type: actions.DELETED_COMMENT,
                commentId,
                sectionId
            });
        });
    };
}

export function submitEditComment(sectionId, commentId, comment) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId
        });

        let newComment = {
            type: 'compliance-comment',
            id: commentId,
            attributes: {
                text: comment
            }
        };

        return axios
            .patch('/compliance/comment', { data: newComment })
            .then(() => {
                dispatch({
                    type: actions.SUBMITTED_EDIT_COMMENT,
                    sectionId,
                    commentId: commentId,
                    comment: comment,
                    date: format(new Date(), 'MM-DD-YYYY HH:m:s')
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
        const { preferredSupplierId } = getState().ui;

        let newComment = {
            type: 'compliance-comment',
            id: null,
            attributes: {
                pepp_organisation_custom_field_section_id: sectionId,
                text: comment,
                pepp_preferred_supplier_id: preferredSupplierId
            }
        };

        return axios
            .post('/compliance/comment', { data: newComment })
            .then(response => {
                const staffId = response.data.data.relationships.staff.data.id;
                const staff = response.data.included
                    .filter(include => include.type === 'staff')
                    .pop();
                const commentId = response.data.data.id;
                const date = response.data.data.attributes.date;
                dispatch({
                    type: actions.SUBMITTED_NEW_COMMENT,
                    sectionId,
                    staffId,
                    firstName: staff.attributes.first_name,
                    lastName: staff.attributes.last_name,
                    commentId,
                    date,
                    comment
                });
            });
    };
}
