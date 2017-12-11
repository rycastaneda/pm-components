import * as actions from '../constants/ActionTypes';
import axios from 'axios';

export function fetchEvaluation(assignmentId, currentView) {
    return (dispatch, getState) => {
        let assignment = assignmentId || getState().ui.assignmentId;

        dispatch({
            type: actions.FETCH_EVALUATION,
            assignmentId: assignment,
            currentView
        });

        let includes = [
            'template.criteria.questions',
            'assigneeUser.staff',
            'questionResponses.question'
        ];

        if (currentView !== 'single') {
            includes.push(
                'relatedAssignments.questionResponses',
                'relatedAssignments.assigneeUser.staff'
            );
        }

        return axios
            .get(
                `/evaluation-template-assignments/${assignment}?include=${includes.join(
                    ','
                )}`
            )
            .then(response => {
                return dispatch({
                    type: actions.RECEIVE_EVALUATION,
                    evaluation: response.data
                });
            });
    };
}

export function changeView(view) {
    return {
        type: actions.CHANGE_VIEW,
        view
    };
}

export function changeTab(criterionId, tab) {
    return {
        type: actions.CHANGE_TAB,
        criterionId,
        tab
    };
}

export function toggleCriterionCollapse(criterionId) {
    return {
        type: actions.TOGGLE_CRITERION_COLLAPSE,
        criterionId
    };
}
