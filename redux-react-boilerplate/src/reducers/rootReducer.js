import { combineReducers } from 'redux';
import pmBoilerplateComponentReducer  from '../components/PmBoilerplateComponent/reducer';

const reducer = combineReducers({
    pmBoilerplate: pmBoilerplateComponentReducer,
});

export default reducer;
