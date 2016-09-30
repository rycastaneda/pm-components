import { CLICK_BUTTON } from '../constants/ActionTypes';

export function clickedButton(state = '', action) {
    switch (action.type) {
        case CLICK_BUTTON:
            return action.name;
        default:
            return state;
    }
}