import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function questions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveQuestions(state, action);
    }

    return state;
}

function receiveQuestions(state, action) {
    const { byId, allIds } = state;
    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'evaluation-questions')
            .map(question => {
                let commentIds = [];

                byId[question.id] = {
                    id: question.id,
                    questionTitle: question.attributes.text,
                    totalScore: 0,
                    commentIds
                };

                allIds.push(question.id);
            });
    }

    return {
        byId,
        allIds
    };
}
