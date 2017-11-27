import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function criterion(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveCriteria(state, action);
    }

    return state;
}

function receiveCriteria(state, action) {
    const { byId, allIds } = state;
    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'evaluation-criteria')
            .map(criteria => {
                let questionIds = [];

                if (criteria.relationships) {
                    questionIds = criteria.relationships.questions.data.map(
                        question => question.id
                    );
                }

                byId[criteria.id] = {
                    id: criteria.id,
                    questionIds,
                    ...criteria.attributes
                };

                allIds.push[criteria.id];
            });
    }

    return {
        byId,
        allIds
    };
}
