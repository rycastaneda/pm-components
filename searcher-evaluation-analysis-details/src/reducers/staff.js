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

    const { data, included } = action.evaluation;

    const isChair = staffId => {
        if (
            data.relationships.relatedAssignments &&
            data.relationships.relatedAssignments.data.length
        ) {
            let relatedAssignments = included.filter(
                include => include.type === 'evaluation-template-assignments'
            );
            return [data, ...relatedAssignments].some(assignment => {
                return assignment.relationships.chairStaff.data.id === staffId;
            });
        } else {
            return data.relationships.chairStaff.data.id === staffId;
        }
    };

    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'staff')
            .map(staff => {
                byId[staff.id] = {
                    id: staff.id,
                    name: `${staff.attributes.first_name} ${staff.attributes
                        .last_name}`,
                    isChair: isChair(staff.id)
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
