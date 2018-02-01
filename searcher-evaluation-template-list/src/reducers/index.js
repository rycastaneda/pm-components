import { combineReducers } from 'redux';
import { evaluationTemplates } from './evaluationTemplates';
import { notification } from '../notification/reducers';
import pmDateRangeReducer from '../components/PMDateRange/reducer';

export default combineReducers({
    evaluationTemplates,
    notification,
    pmDateRange: pmDateRangeReducer,
});
