import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    panelId: null,
    error: ''
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            return {
                ...state,
                panelId: action.panelId
            };
        case actions.API_ERROR:
            return {
                ...state,
                error:
                    action.error ||
                    'Something went wrong. Please try again later.'
            };
    }

    return state;
}
