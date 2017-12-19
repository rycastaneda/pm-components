import { combineReducers } from 'redux';
import { evaluationTemplateCreator } from './evaluationTemplateCreator';
import { notification } from '../notification/reducers';
import { modal } from '../modal/reducers';
export default combineReducers({
    modal, notification, evaluationTemplateCreator
});
