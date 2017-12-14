import { combineReducers } from 'redux';
import { evaluationTemplates } from './evaluationTemplates';
import { notification } from '../notification/reducers';
export default combineReducers({
    evaluationTemplates, notification
});
