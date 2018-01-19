import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveStaff(state, action);
    }

    return state;
}

function receiveStaff(state, action) {
    const { byId, allIds } = state;

    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'staff')
            .map(staff => {
                byId[staff.id] = {
                    id: staff.id,
                    name: `${staff.attributes.first_name} ${staff.attributes
                        .last_name}`
                };

                if (!allIds.includes(staff.id)) {
                    allIds.push(staff.id);
                }
            });
    }

    return {
        byId,
        allIds
    };
}
