import * as actions from '../constants';
import axios from 'axios';

export function changeStaffResponse(
    sectionId,
    staffId,
    responseId,
    statusId,
    statusLabel
) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_STAFF_LOADING,
            staffId
        });

        const newStatus = {
            type: 'compliance-assignment',
            id: responseId,
            attributes: { status: statusId }
        };

        const preferredSupplierId = getState().ui.preferredSupplierId;

        return axios
            .patch(
                `/preferred-suppliers/${preferredSupplierId}/compliance-sections/${sectionId}/assignments/${responseId}`,
                { data: newStatus }
            )
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
