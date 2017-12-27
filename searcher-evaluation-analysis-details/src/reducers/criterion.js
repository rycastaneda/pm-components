import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function criterion(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveCriteria(state, action);
        case actions.CHANGE_TAB:
            state.byId[action.criterionId].currentTab = action.tab;
            return { ...state };
        case actions.TOGGLE_CRITERION_COLLAPSE:
            state.byId[action.criterionId].isOpen = !state.byId[
                action.criterionId
            ].isOpen;
            return { ...state };
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
                    id: +criteria.id,
                    questionIds,
                    ...criteria.attributes,
                    isOpen: false,
                    currentTab: 'responses'
                };

                if (!allIds.includes(criteria.id)) {
                    allIds.push(criteria.id);
                }
            });
    }

    return {
        byId,
        allIds
    };
}
