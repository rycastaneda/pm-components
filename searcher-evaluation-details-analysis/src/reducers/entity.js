import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byType: {}
};

export function entity(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveEntity(state, action);
    }

    return state;
}

function receiveEntity(state, action) {
    let { byType } = state;
    const { data, included } = action.evaluation;

    const getEntitySupplier = (type, id) => {
        let entity = included
            .filter(include => include.type === type && include.id === id)
            .pop();
        // Recursion to get supplier on assignmentEntity
        if (entity.relationships && entity.relationships.matchedSupplier) {
            const { type, id } = entity.relationships.matchedSupplier.data;
            entity = getEntitySupplier(type, id);
        }

        if (entity.relationships && entity.relationships.supplier) {
            const { type, id } = entity.relationships.supplier.data;
            entity = getEntitySupplier(type, id);
        }

        return entity;
    };

    const mapEntity = assignment => {
        let entityInstance =
            assignment.relationships.assignmentEntityInstance.data;
        let entity = getEntitySupplier(entityInstance.type, entityInstance.id);

        byType[entityInstance.type] = {
            ...byType[entityInstance.type],
            [entityInstance.id]: {
                ...entityInstance,
                ...entity.attributes
            }
        };
    };

    if (
        data.relationships.relatedAssignments &&
        data.relationships.relatedAssignments.data.length
    ) {
        let relatedAssignments = included.filter(
            include => include.type === 'evaluation-template-assignments'
        );
        [data, ...relatedAssignments].map(mapEntity);
    } else {
        mapEntity(data);
    }

    return {
        byType
    };
}
