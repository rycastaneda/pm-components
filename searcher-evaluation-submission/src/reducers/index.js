import { combineReducers } from 'redux';
import { notification } from '../notification/reducers';
import { evaluationSubmission } from './EvaluationSubmissionReducer';

export default combineReducers({
    evaluationSubmission, notification
});
