import * as actions from '../constants/ActionTypes';
import axios from 'axios';
import mockStaff from '../mocks/staff.json';

export function fetchStaff(sectionId) {
    return (dispatch, getState) => {
        if (!getState().staff.needsFetching) {
            return;
        }

        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.RECEIVE_STAFF,
                sectionId,
                staffs: mockStaff
            });
        });
    };
}

export function assignStaff(sectionId, staffId, callback) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.ASSIGN_STAFF,
                sectionId,
                staffId
            });
            callback && callback(); // execute callback if provided; will call setState in react component
        });
    };
}

export function removeStaff(sectionId, staffId, callback) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        return axios.get('/anything').then(() => {
            dispatch({
                type: actions.REMOVE_STAFF,
                sectionId,
                staffId
            });
            callback && callback(); // execute callback if provided; will call setState in react component
        });
    };
}
