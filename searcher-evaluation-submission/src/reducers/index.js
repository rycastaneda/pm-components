import { combineReducers } from 'redux';
import { notification } from '../notification/reducers';
import { evaluationSubmission } from './EvaluationSubmissionReducer';
import { modal } from '../modal/reducers';
export default combineReducers({
    modal, evaluationSubmission, notification
});
