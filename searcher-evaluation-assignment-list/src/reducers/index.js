import { combineReducers } from 'redux';
import { evaluationAssignments } from './evaluationAssignments';
import { notification } from '../notification/reducers';
export default combineReducers({
    notification, evaluationAssignments
});
