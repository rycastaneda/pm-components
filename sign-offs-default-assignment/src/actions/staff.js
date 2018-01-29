import * as actions from '../constants/ActionTypes';
import axios from 'axios';

export function fetchStaff(sectionId) {
    return (dispatch, getState) => {
        if (!getState().staff.needsFetching) {
            return;
        }

        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        return axios
            .get('/staff')
            .then(response => {
                dispatch({
                    type: actions.RECEIVE_STAFF,
                    sectionId,
                    staffs: response.data
                });
            })
            .catch(() => dispatch({ type: actions.API_ERROR }));
    };
}

export function assignStaff(sectionId, staffId, callback) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        const data = {
            type: 'compliance-default-assignment',
            id: null,
            attributes: {
                pepp_organisation_custom_field_section_id: sectionId,
                pepp_staff_user_id: getState().staff.byId[staffId].user_id,
                panel_id: getState().ui.panelId
            }
        };

        return axios
            .post('/compliance/default-assignment', { data })
            .then(response => {
                dispatch({
                    type: actions.ASSIGN_STAFF,
                    sectionId,
                    staffId,
                    assignmentId: response.data.data.id
                });
                callback && callback(); // execute callback if provided; will call setState in react component
            })
            .catch(response => {
                dispatch({
                    type: actions.API_ERROR,
                    error: response.response.data.message
                });
            });
    };
}

export function removeStaff(sectionId, staffId, callback) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        const assignmentId = getState().sections.byId[sectionId]
            .userIdToAssignmentId[staffId];
        return axios
            .delete(`/compliance/default-assignment/${assignmentId}`)
            .then(() => {
                dispatch({
                    type: actions.REMOVE_STAFF,
                    sectionId,
                    staffId,
                    assignmentId
                });
                callback && callback(); // execute callback if provided; will call setState in react component
            })
            .catch(response => {
                dispatch({
                    type: actions.API_ERROR,
                    error: response.response.data.message
                });
            });
    };
}
