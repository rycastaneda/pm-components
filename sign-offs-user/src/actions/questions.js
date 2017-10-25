import mockQuestions from '../mocks/questions.json';
import * as actions from '../constants';
import axios from 'axios';

export function fetchQuestions(sectionId) {
    return (dispatch) => {
        dispatch({
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId
        });

        // TODO: api endpoint
        return axios.get('/compliance-questionnaire')
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
