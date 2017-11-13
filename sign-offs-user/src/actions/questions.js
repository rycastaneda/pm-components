import mockQuestions from '../mocks/questions.json';
import * as actions from '../constants';
import axios from 'axios';

export function fetchQuestions(sectionId) {
    return (dispatch, getState) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });
        const { organizationId, supplierUserId } = getState().ui;

        return axios
            .get(
                `/compliance/questionnaire/${organizationId}/${supplierUserId}?filters[section_id]=${sectionId}`
            )
            .then(() => {
                dispatch({
                    type: actions.RECEIVE_QUESTIONS,
                    sectionId,
                    questions: mockQuestions
                });

                dispatch({
                    type: actions.TOGGLE_SECTION_LOADING,
                    sectionId
                });
            });
    };
}
