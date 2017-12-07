import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function entity(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveEntity(state, action);
    }

    return state;
}

function receiveEntity(state, action) {
    let { byId, allIds } = state;
    const { data, included } = action.evaluation;

    if (
        data.relationships.relatedAssignments &&
        data.relationships.relatedAssignments.data.length
    ) {
        let relatedAssignments = action.evaluation.included.filter(
            include => include.type === 'evaluation-template-assignments'
        );
        [data, ...relatedAssignments].map(assignment => {
            let entityInstance =
                assignment.relationships.assignmentEntityInstance.data;

            let entity = action.evaluation.included
                .filter(include => include.type === entityInstance.type)
                .pop();

            byId[entityInstance.id] = {
                ...entityInstance,
                ...entity.attributes
            };

            if (!allIds.includes(entityInstance.id)) {
                allIds.push(entityInstance.id);
            }
        });
    }

    // let entityInstance =
    //     action.evaluation.data.relationships.assignmentEntityInstance.data;

    // let entity = action.evaluation.included
    //     .filter(include => include.type === entityInstance.type)
    //     .pop();

    // byId[entityInstance.id] = {
    //     ...entityInstance,
    //     ...entity.attributes
    // };

    return {
        byId,
        allIds
    };
}
