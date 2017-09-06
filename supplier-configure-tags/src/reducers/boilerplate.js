import { IS_CLICKED, INITIAL_STATE } from '../constants/ActionTypes';

const INITIAL_BOILERPLATE_STATE = { buttonIsClicked: false };

export function boilerplate(state = INITIAL_BOILERPLATE_STATE, action) {
    switch (action.type) {
        case IS_CLICKED:
            return Object.assign({}, state, {
                buttonIsClicked: true
            });
        case INITIAL_STATE:
            return Object.assign({}, state, INITIAL_BOILERPLATE_STATE);
        default:
            return state;
    }
}