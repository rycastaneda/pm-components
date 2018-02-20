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

        return axios.get('/staff?filter[pitRoles]=1,2,3&filter[is_deleted]=0').then(response => {
            dispatch({
                type: actions.RECEIVE_STAFF,
                staffs: response.data
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
        const { preferredSupplierId } = getState().ui;
        const staffUserId = getState().staff.byId[staffId].user_id;
        const staffResponse = {
            type: 'compliance-assignment',
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
                `/preferred-suppliers/${preferredSupplierId}/compliance-sections/${sectionId}/assignments`,
                { data: staffResponse }
            )
            .then(response => {
                const responseId = response.data.data.id;
                const statusId = response.data.data.attributes.status;
                dispatch({
                    type: actions.ADDED_STAFF_RESPONSE,
                    sectionId,
                    staffId,
                    responseId,
                    statusId
                });
            });
    };
}

export function deleteStaffResponse(sectionId, staffId, responseId) {
    return (dispatch, getState) => {
        const { preferredSupplierId } = getState().ui;

        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        return axios
            .delete(
                `/preferred-suppliers/${preferredSupplierId}/compliance-sections/${sectionId}/assignments/${responseId}`
            )
            .then(() => {
                dispatch({
                    type: actions.DELETED_STAFF_RESPONSE,
                    sectionId,
                    staffId,
                    responseId
                });
            });
    };
}

export function changeStaffResponse(
    sectionId,
    staffId,
    responseId,
    statusId,
    status
) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        const newReponse = {
            type: 'compliance-assignment',
            id: responseId,
            attributes: { status: statusId }
        };
        const { preferredSupplierId } = getState().ui;

        return axios
            .patch(
                `/preferred-suppliers/${preferredSupplierId}/compliance-sections/${sectionId}/assignments/${responseId}`,
                { data: newReponse }
            )
            .then(() => {
                dispatch({
                    type: actions.CHANGE_STAFF_RESPONSE,
                    responseId,
                    statusId,
                    staffId,
                    status
                });
            });
    };
}
