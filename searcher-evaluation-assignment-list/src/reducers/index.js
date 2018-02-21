import { combineReducers } from 'redux';
import { evaluationAssignments } from './evaluationAssignments';
import { notification } from '../notification/reducers';
import pmDateRangeReducer from '../components/PMDateRange/reducer';
export default combineReducers({
    notification,
    evaluationAssignments,
    pmDateRange: pmDateRangeReducer,
});
