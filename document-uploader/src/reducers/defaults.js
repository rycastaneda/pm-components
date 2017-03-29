import {
    GROUPS_RECEIVING_DEFAULTS,
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: {}
};

export function defaults(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GROUPS_RECEIVING_DEFAULTS:
            action.defaults.data.map((defaultGroup) => {
                state.byId[defaultGroup.id] = Object.assign({}, defaultGroup.attributes, {id: defaultGroup.id});
            });
            return Object.assign({}, state);
        default:
            return state;
    }
}