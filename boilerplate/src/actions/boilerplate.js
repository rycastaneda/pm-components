import { CLICK_BUTTON } from '../constants/ActionTypes';

export function clickButton(name) {
    return {
        type: CLICK_BUTTON,
        name
    };
}