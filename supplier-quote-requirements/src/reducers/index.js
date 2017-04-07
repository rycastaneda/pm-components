import { combineReducers } from 'redux';
import { requirements } from './requirements';
import { responses } from './responses';


export default combineReducers({
    requirements,
    responses
});
