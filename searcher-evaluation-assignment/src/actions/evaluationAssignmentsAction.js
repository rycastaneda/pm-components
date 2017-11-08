import {
    IS_CLICKED,
    INITIAL_STATE,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
} from '../constants/ActionTypes';

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

export function incrementCounter() {
    return {
        type: INCREMENT_COUNTER
    };
}

export function decrementCounter() {
    return {
        type: DECREMENT_COUNTER
    };
}
