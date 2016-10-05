import { IS_CLICKED, INITIAL_STATE } from '../constants/ActionTypes';

const INITAL_BOILERPLATE_STATE = { buttonIsClicked: false };

export function boilerplate(state = INITAL_BOILERPLATE_STATE, action) {
    switch (action.type) {
        case IS_CLICKED:
            return Object.assign({}, state, {
                buttonIsClicked: true
            });
        case INITIAL_STATE:
            return Object.assign({}, state, INITAL_BOILERPLATE_STATE);
        default:
            return state;
    }
}