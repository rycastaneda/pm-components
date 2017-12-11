import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function evaluation(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveEvaluation(state, action);
    }

    return state;
}

function receiveEvaluation(state, action) {
    let { byId, allIds } = state;
    let assignment = action.evaluation.data;
    let criteriaIds = [];
    const evaluationId = assignment.relationships.template.data.id;
    if (action.evaluation.included) {
        criteriaIds = action.evaluation.included
            .filter(included => included.type === 'evaluation-criteria')
            .map(criteria => criteria.id);
    }

    byId[evaluationId] = {
        id: evaluationId,
        criteriaIds,
        ...assignment.attributes
    };

    allIds.push(evaluationId);

    return {
        byId,
        allIds
    };
}
