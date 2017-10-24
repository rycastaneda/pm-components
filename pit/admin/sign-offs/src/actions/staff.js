import mockStaffs from '../mocks/staff.json';
import * as actions from '../constants';
import axios from 'axios';

export function fetchStaff(refresh = false) {
    return (dispatch, getState) => {
        if (!getState().staff.needsFetching && !refresh) {
            return;
        }

        dispatch({
            type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
        });

        return axios.get('/anything').then(() => {
        // return axios.all([]).then(() => {
            dispatch({
                type: actions.RECEIVE_STAFF,
                staffs: mockStaffs
            });

            dispatch({
                type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
            });

        });
    };
}

export function addStaffResponse(sectionId, staffId) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
        });

        return axios.get('/anything').then(() => {
            const responseId = getState().response.allIds.length + 1; // TODO: replace with backend response

            dispatch({
                type: actions.ADDED_STAFF_RESPONSE,
                sectionId,
                staffId,
                responseId
            });

            dispatch({
                type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
            });
        }); 
    };
}

export function deleteStaffResponse(sectionId, staffId, responseId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.DELETED_STAFF_RESPONSE,
                sectionId,
                responseId
            });

            dispatch({
                type: actions.TOGGLE_STAFF_LOADING,
                staffId
            });
        }); 
    };
}

export function changeStaffResponse(staffId, responseId, status) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.CHANGE_STAFF_RESPONSE,
                responseId,
                status
            });

            dispatch({
                type: actions.TOGGLE_STAFF_LOADING,
                staffId
            });
        }); 
    };
}