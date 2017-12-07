import axios from 'axios';
import { parseInitialize } from '../utils/dataParser';
import { INITIAL_STATE, REQUEST_FAILED, OPTION_SELECTED } from '../constants/ActionTypes';

export function initialize(requestedAssignmentId) {
    return (dispatch) => {
        return axios.get('/evaluation-template-assignments/'+requestedAssignmentId+'?include=template.criteria.questions')
        .then((response) => {
            let result =parseInitialize(response.data, requestedAssignmentId);
            dispatch({ type:INITIAL_STATE, ...result });
        })
        .catch((error) => {
            const { message }= error;
            dispatch({ type:REQUEST_FAILED, message });
        });
    };
}
export function setOptionValue(criteriaId, questionId, optionId, value) {
    return { type:OPTION_SELECTED, criteriaId, questionId, optionId, value };
}
