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
            .get('/staff?filter[pitRoles]=1,2,3&filter[is_deleted]=0')
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

        const panelId = getState().ui.panelId;
        const staffUserId = getState().staff.byId[staffId].user_id;
        const data = {
            type: 'compliance-default-assignment',
            attributes: {},
            relationships: {
                staff: {
                    type: 'users',
                    id: staffUserId
                }
            }
        };

        return axios
            .post(
                `/panels/${panelId}/compliance-sections/${sectionId}/assignments`,
                { data }
            )
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
        const panelId = getState().ui.panelId;

        return axios
            .delete(
                `/panels/${panelId}/compliance-sections/${sectionId}/assignments/${assignmentId}`
            )
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
