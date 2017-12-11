import { combineReducers } from 'redux';
import { evaluationTemplateCreator } from './evaluationTemplateCreator';
import { notification } from '../notification/reducers';
export default combineReducers({
    notification, evaluationTemplateCreator
});
