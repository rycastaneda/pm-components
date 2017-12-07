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
    // if (
    //     action.evaluation.data.relatedAssignments &&
    //     action.evaluation.data.relatedAssignments.data.length
    // ) {
    //     let relatedAssignments = action.evaluation.included.filter(include => include.type === 'evaluation-template-assignments');
    //     [action.evaluation.data, ...relatedAssignments].map(getEvaluation);
    // } else {
    getEvaluation(action.evaluation.data);
    // }

    function getEvaluation(assignment) {
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
    }

    return {
        byId,
        allIds
    };
}
