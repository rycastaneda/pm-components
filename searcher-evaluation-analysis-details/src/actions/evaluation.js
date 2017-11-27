import * as actions from '../constants/ActionTypes';
import axios from 'axios';

export function fetchEvaluation(evaluationId, currentView) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_EVALUATION,
            evaluationId,
            currentView
        });

        // TODO: api endpoint
        return axios
            .get(
                `/evaluation-templates/${evaluationId}?include=criteria.questions`
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
