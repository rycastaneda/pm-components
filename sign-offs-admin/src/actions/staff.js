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

        return axios.get('/staff').then(response => {
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
            id: null,
            attributes: {
                pepp_organisation_custom_field_section_id: sectionId,
                assigned_to_user_id: staffUserId,
                pepp_preferred_supplier_id: preferredSupplierId
            }
        };

        return axios
            .post('/compliance/assignment', { data: staffResponse })
            .then(response => {
                const responseId = response.data.data.id;
                dispatch({
                    type: actions.ADDED_STAFF_RESPONSE,
                    sectionId,
                    staffId,
                    responseId
                });
            });
    };
}

export function deleteStaffResponse(sectionId, staffId, responseId) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        return axios.delete(`/compliance/assignment/${responseId}`).then(() => {
            dispatch({
                type: actions.DELETED_STAFF_RESPONSE,
                sectionId,
                staffId,
                responseId
            });
        });
    };
}

export function changeStaffResponse(staffId, responseId, statusId, status) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        const newReponse = {
            type: 'compliance-assignment',
            id: responseId,
            attributes: { status: statusId }
        };

        return axios
            .patch('/compliance/assignment-status', { data: newReponse })
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
