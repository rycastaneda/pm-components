import * as actions from '../constants';
const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function questions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveQuestions(state, action);
        default:
            return state;
    }
}

function receiveQuestions(state, action) {
    const { byId, allIds } = state;
    const valueIdToAnswer = {};
    action.sections.included
        .filter(include => include.type === 'compliance-field-values')
        .map(answer => {
            valueIdToAnswer[answer.id] = answer.attributes.value;
        });

    const questions = action.sections.included.filter(
        include => include.type === 'compliance-fields'
    );

    questions.map(question => {
        let uploadIds = [];

        if (question.relationships && question.relationships.supplierUploads) {
            uploadIds = question.relationships.supplierUploads.data.map(
                upload => upload.id
            );
        }
        byId[question.id] = {
            id: question.id,
            type: question.attributes.type,
            question: question.attributes.label,
            uploadIds,
            answer: question.relationships
                ? valueIdToAnswer[question.relationships.values.data.id]
                : null
        };
        allIds.push(question.id);
    });

    return {
        byId,
        allIds
    };
}
