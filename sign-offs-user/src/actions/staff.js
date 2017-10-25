import * as actions from '../constants';
import axios from 'axios';

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