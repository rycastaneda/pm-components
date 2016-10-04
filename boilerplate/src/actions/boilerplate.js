import { BUTTON_IS_CLICKED, INITIAL_STATE } from '../constants/ActionTypes';

export function updateState() {
    return (dispatch, getState) => {
        if (getState().boilerplate.buttonIsCLicked) return;

        return dispatch({
            type: BUTTON_IS_CLICKED
        });
    };
}

export function resetState() {
    return {
        type: INITIAL_STATE
    };
}