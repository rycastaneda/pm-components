import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return { ...state };
    }

    return state;
}

// function receiveStaff(state, action) {
//     const { byId, allIds } = state;
//     return {
//         byId,
//         allIds
//     };
// }
