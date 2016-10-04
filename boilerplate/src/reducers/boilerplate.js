import { BUTTON_IS_CLICKED, INITIAL_STATE } from '../constants/ActionTypes';

const INITAL_BOILERPLATE_STATE = { buttonIsCLicked: false };

export function boilerplate(state = INITAL_BOILERPLATE_STATE, action) {
    switch (action.type) {
        case BUTTON_IS_CLICKED:
            return Object.assign({}, state, {
                buttonIsCLicked: true
            });
        case INITIAL_STATE:
            return Object.assign({}, state, INITAL_BOILERPLATE_STATE);
        default:
            return state;
    }
}