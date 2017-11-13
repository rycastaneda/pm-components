import * as actions from '../constants';
import axios from 'axios';

export function changeStaffResponse(
    staffId,
    responseId,
    statusId,
    statusLabel
) {
    return dispatch => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        const newStatus = {
            type: 'compliance-assignment',
            id: responseId,
            attributes: { status: statusId }
        };
        return axios
            .patch('/compliance/assignment-status', { data: newStatus })
            .then(() => {
                dispatch({
                    type: actions.CHANGE_STAFF_RESPONSE,
                    responseId,
                    statusId,
                    status: statusLabel
                });

                dispatch({
                    type: actions.TOGGLE_STAFF_LOADING,
                    staffId
                });
            });
    };
}
