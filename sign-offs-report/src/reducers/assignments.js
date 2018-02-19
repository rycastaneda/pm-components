import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function assignments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receiveAssignments(state, action);
    }

    return state;
}

function receiveAssignments(state, action) {
    const byId = {};
    const allIds = [];
    action.assignments.included &&
        action.assignments.included
            .filter(include => include.type === 'compliance-assignments')
            .map(assignment => {
                byId[assignment.id] = {
                    id: assignment.id,
                    statusId: assignment.attributes.status,
                    staffId: assignment.relationships.assignedStaff.data.id
                };

                allIds.push(assignment.id);
            });

    return {
        byId,
        allIds
    };
}
