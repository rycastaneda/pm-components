import * as actions from '../constants/ActionTypes';
import mockEvaluation from '../mocks/evaluation.json';
import axios from 'axios';
export function fetchEvaluation(evaluationId, currentView) {
    return dispatch => {
        axios.defaults.baseURL = 'http://httpbin.org';
        dispatch({
            type: actions.FETCH_EVALUATION,
            evaluationId,
            currentView
        });
        return axios
            .get(
                // `/evaluation-templates/${evaluationId}?include=criteria.questions`
                '/anything'
            )
            .then(response => {
                return dispatch({
                    type: actions.RECEIVE_EVALUATION,
                    evaluation: mockEvaluation
                });
            });
    };
}

export function changeView(view) {
    return dispatch => {
        dispatch({
            type: actions.CHANGE_VIEW,
            view
        });

        // // TODO: api endpoint
        // return axios.get('/anything').then(response => {
        //     return dispatch({
        //         type: actions.RECEIVE_EVALUATIONS,
        //         evaluation: response.data
        //     });
        // });
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

