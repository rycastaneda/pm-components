import {
    DEFAULTS_RECEIVING
} from '../constants/ActionTypes';
import { Map } from 'immutable';

const INITIAL_STATE = Map({
    byId: {},
    allIds: {}
});

export function defaults(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DEFAULTS_RECEIVING: return receiveDefaults(state, action);
        default:
            return state;
    }
}

function receiveDefaults(state, action) {
    const { defaults } = action;

    const allIds = [];

    defaults.map((defaultGroup) => {
        state.setIn(['byId', defaultGroup.id], defaultGroup.attributes);
        allIds.push(defaultGroup.id);
    });

    state.set('allIds', allIds);

    return state;
}