import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function assignments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveAssignments(state, action);
    }

    return state;
}

function receiveAssignments(state, action) {
    const byId = {};
    const allIds = [];

    const { data } = action.evaluation;

    if (
        data.relationships.relatedAssignments &&
        data.relationships.relatedAssignments.data.length
    ) {
        let relatedAssignments = action.evaluation.included.filter(
            include => include.type === 'evaluation-template-assignments'
        );
        [data, ...relatedAssignments].map(getAssignment);
    } else {
        getAssignment(data);
    }

    function getQuestionId(responseId) {
        let response = action.evaluation.included.find(
            include =>
                include.id === responseId &&
                include.type === 'evaluation-question-responses'
        );
        return response.relationships.question.data.id;
    }

    function getAssignment(assignment) {
        byId[assignment.id] = {
            ...assignment.attributes,
            entityId: assignment.relationships.assignmentEntityInstance.data.id,
            entityType:
                assignment.relationships.assignmentEntityInstance.data.type,
            responseIds: assignment.relationships.questionResponses.data.map(
                response => response.id
            ),
            questionIds: assignment.relationships.questionResponses.data.map(
                response => getQuestionId(response.id)
            ),
            templateId: assignment.relationships.template.data.id
        };

        if (!allIds.includes(assignment.id)) {
            allIds.push(assignment.id);
        }
    }

    return {
        byId,
        allIds
    };
}
