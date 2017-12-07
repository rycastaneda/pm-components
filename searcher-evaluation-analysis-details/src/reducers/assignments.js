import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function assignments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveAssignments(state, action);
    }

    return state;
}

function receiveAssignments(state, action) {
    const byId = {};
    const allIds = [];

    const { data } = action.evaluation;

    if (
        data.relationships.relatedAssignments &&
        data.relationships.relatedAssignments.data.length
    ) {
        let relatedAssignments = action.evaluation.included.filter(
            include => include.type === 'evaluation-template-assignments'
        );
        [data, ...relatedAssignments].map(assignment => {
            byId[assignment.id] = {
                ...assignment.attributes,
                entityId:
                    assignment.relationships.assignmentEntityInstance.data.id,
                responseIds: assignment.relationships.questionResponses.data.map(
                    response => response.id
                )
            };

            if (!allIds.includes(assignment.id)) {
                allIds.push(assignment.id);
            }
        });
    } else {
        byId[data.id] = {
            ...data.attributes,
            entityId: data.relationships.assignmentEntityInstance.data.id,
            responseIds: data.relationships.questionResponses.data.map(
                response => response.id
            )
        };

        if (!allIds.includes(data.id)) {
            allIds.push(data.id);
        }
    }

    return {
        byId,
        allIds
    };
}
