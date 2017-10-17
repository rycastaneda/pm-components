import mockSections from '../mocks/sections.json';
import mockStaff from '../mocks/staff.json';
import * as actions from '../constants';
import axios from 'axios';
import format from 'date-fns/format';

export function fetchSections(isReadOnly, staffId) {
    return (dispatch) => {
        dispatch({
            type: actions.FETCH_SECTIONS,
            isReadOnly,
            staffId
        });

        // TODO: api endpoint
        // return axios.get('https://httpbin.org/delay/1')
        return axios.all([])
            .then(() => {
                return dispatch({
                    type: actions.RECEIVE_SECTIONS,
                    sections: mockSections
                });
            });
    };
}

export function toggleSectionCollapse(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_COLLAPSE,
        sectionId
    };
}

export function switchSectionTab(sectionId, currentTab) {
    return {
        type: actions.SWITCH_SECTION_TAB,
        sectionId,
        currentTab
    };
}

export function toggleStaffStatus(sectionId, staffId, status) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        // return axios.get('https://httpbin.org/delay/5').then(() => {
        return axios.all([]).then(() => {
            dispatch({
                type: actions.TOGGLE_STAFF_STATUS,
                sectionId,
                staffId,
                status
            });

            dispatch({
                type: actions.TOGGLE_STAFF_LOADING,
                staffId
            });
        });
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

export function toggleSectionLoading(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_LOADING,
        sectionId
    };
}

export function deleteComment(sectionId, commentId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId
        });

        // return axios.get('https://httpbin.org/delay/1').then(() => {
        return axios.all([]).then(() => {
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
        // return axios.get('https://httpbin.org/delay/1').then(() => {
        return axios.all([newComment]).then(() => {
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
        dispatch(toggleSectionLoading(sectionId));

        let staffId, staffName, commentId,
            newComment = {
                comment
            };

        commentId = getState().comments.allIds.length + 1;
        staffId = 100;
        staffName = 'Tester';

        // TODO: API endpoint
        // return axios.get('https://httpbin.org/delay/1', newComment).then(() => {
        return axios.all([newComment]).then(() => {
            dispatch({
                type: actions.SUBMITTED_NEW_COMMENT,
                sectionId,
                staffId,
                staffName,
                commentId: commentId,
                comment: comment,
                date: format(new Date(), 'MM-DD-YYYY HH:m a')
            });
        });
    };
}

export function toggleManageSectionModal(sectionId) {
    return {
        type: actions.TOGGLE_MANAGE_SECTION_MODAL,
        sectionId
    };
}

export function fetchStaff(refresh = false) {
    return (dispatch, getState) => {
        if (!getState().staff.needsFetching && !refresh) {
            return;
        }

        dispatch({
            type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
        });

        return axios.all([]).then(() => {
        // return axios.get('https://httpbin.org/delay/6').then(() => {
            dispatch({
                type: actions.RECEIVE_STAFF,
                staffs: mockStaff
            });

            dispatch({
                type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
            });

        });
    };
}

export function addStaffResponse(sectionId, staffId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
        });

        return axios.all([]).then(() => {
        // return axios.get('https://httpbin.org/delay/5').then(() => {
            dispatch({
                type: actions.ADDED_STAFF_RESPONSE,
                sectionId,
                staffId
            });

            dispatch({
                type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
            });
        }); 
    };
}


export function deleteStaffResponse(sectionId, staffId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        return axios.all([]).then(() => {
            dispatch({
                type: actions.DELETED_STAFF_RESPONSE,
                sectionId,
                staffId
            });

            console.log("staffId", staffId); // eslint-disable-line no-console, quotes

            dispatch({
                type: actions.TOGGLE_STAFF_LOADING,
                staffId
            });
        }); 
    };
}