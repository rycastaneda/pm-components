import { IS_CLICKED, INITIAL_STATE } from '../constants/ActionTypes';

export function updateState() {
    return (dispatch, getState) => {
        if (getState().boilerplate.buttonIsClicked) return;

        return dispatch({
            type: IS_CLICKED
        });
    };
}

export function resetState() {
    return {
        type: INITIAL_STATE
    };
}