import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EVALUATION:
            return receiveComment(state, action);
    }

    return state;
}

function receiveComment(state, action) {
    const byId = {};
    const allIds = [];

    const { data, included } = action.evaluation;

    // Map comment id to staffId which is from user then to staff
    const commentIdtoStaffId = {};
    const commentIdtoAssignmentId = {};
    if (
        data.relationships.relatedAssignments &&
        data.relationships.relatedAssignments.data.length
    ) {
        let relatedAssignments = action.evaluation.included.filter(
            include => include.type === 'evaluation-template-assignments'
        );
        [data, ...relatedAssignments].map(assignment => {
            assignment.relationships.questionResponses.data.filter(response => {
                let userId = assignment.relationships.assigneeUser.data.id;

                commentIdtoStaffId[response.id] = getStaffId(userId);
                commentIdtoAssignmentId[response.id] = assignment.id;
            });
        });
    } else {
        data.relationships.questionResponses.data.filter(response => {
            let userId = data.relationships.assigneeUser.data.id;
            commentIdtoStaffId[response.id] = getStaffId(userId);
            commentIdtoAssignmentId[response.id] = data.id;
        });
    }

    const questionIdtoCriteriaId = {};

    action.evaluation.included
        .filter(include => include.type === 'evaluation-criteria')
        .map(criteria => {
            criteria.relationships.questions.data.map(question => {
                questionIdtoCriteriaId[question.id] = criteria.id;
            });
        });

    included
        .filter(include => include.type === 'evaluation-question-responses')
        .map(comment => {
            byId[comment.id] = {
                id: comment.id,
                ...comment.attributes,
                score: +comment.attributes.response_value,
                staffId: commentIdtoStaffId[comment.id],
                questionId: comment.relationships.question.data.id,
                assignmentId: commentIdtoAssignmentId[comment.id],
                documentIds: comment.relationships.documents.data.map(
                    upload => upload.id
                ),
                criteriaId:
                    questionIdtoCriteriaId[
                        comment.relationships.question.data.id
                    ]
            };

            if (!allIds.includes(comment.id)) {
                allIds.push(comment.id);
            }
        });

    function getStaffId(userId) {
        let staff = included
            .filter(
                include => include.type === 'users' && include.id === userId
            )
            .pop();

        return staff.relationships.staff.data.id;
    }

    return {
        byId,
        allIds
    };
}
