import * as actions from '../constants';
import axios from 'axios';

export function fetchQuestions(sectionId) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        const { organizationId, supplierUserId } = getState().ui;
        // TODO: api endpoint
        return axios
            .get(
                `/compliance/questionnaire/${organizationId}/${supplierUserId}?filters[section_id]=${sectionId}`
            )
            .then(response => {
                dispatch({
                    type: actions.RECEIVE_QUESTIONS,
                    sectionId,
                    questions: response.data
                });
            });
    };
}
