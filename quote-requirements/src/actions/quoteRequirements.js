import { IS_EDITING, IS_DELETED } from '../constants/ActionTypes';

export function setAsEditing(id) {
    return (dispatch) => {
        return dispatch({
            type: IS_EDITING,
            id
        });
    };
}

export function deleteRequirement(id) {
    return (dispatch) => {
        return dispatch({
            type: IS_DELETED,
            id
        });
    };
}