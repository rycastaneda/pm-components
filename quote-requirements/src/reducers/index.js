import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { quoteRequirements } from './quoteRequirements';


export default combineReducers({
    api,
    quoteRequirements
});