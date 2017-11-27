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
    const { byId, allIds } = state;

    const evaluationId = action.evaluation.data.id;

    let criteriaIds = [];

    if (action.evaluation.included) {
        criteriaIds = action.evaluation.included
            .filter(included => included.type === 'evaluation-criteria')
            .map(criteria => criteria.id);
    }

    byId[evaluationId] = {
        id: evaluationId,
        criteriaIds,
        ...action.evaluation.data.attributes
    };

    return {
        byId,
        allIds: allIds.concat(evaluationId)
    };
}
