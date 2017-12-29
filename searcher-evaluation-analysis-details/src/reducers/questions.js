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

    const getScale = question => {
        let type = action.evaluation.included
            .filter(include => include.type === 'evaluation-question-types')
            .filter(type => type.id === question.relationships.type.data.id)
            .pop();

        switch (type.attributes.title) {
            case 'Scale (0 - 5)':
                return 5;
            case 'Scale (0 - 10)':
                return 10;
            case 'Yes/No':
                return 1;
            default:
                return 0;
        }
    };

    if (action.evaluation.included) {
        action.evaluation.included
            .filter(included => included.type === 'evaluation-questions')
            .map(question => {
                let comments = getComments(
                    question.id,
                    action.evaluation.included
                );

                let totalScore = 0;
                if (comments.length) {
                    totalScore = comments
                        .map(comment => +comment.attributes.response_value)
                        .reduce((responseA, responseB) => {
                            return responseA + responseB;
                        });
                }
                totalScore = totalScore ? totalScore / comments.length : 0;
                totalScore = parseFloat(totalScore).toFixed(1);

                byId[question.id] = {
                    id: question.id,
                    questionTitle: question.attributes.text,
                    totalScore: totalScore,
                    scale: getScale(question),
                    commentIds: comments.map(comment => comment.id)
                };



                allIds.push(question.id);
            });
    }

    return {
        byId,
        allIds
    };
}

function getComments(questionId, included) {
    return included
        .filter(included => included.type === 'evaluation-question-responses')
        .filter(
            responses => responses.relationships.question.data.id === questionId
        );
    // .map(response => response.id);
}
