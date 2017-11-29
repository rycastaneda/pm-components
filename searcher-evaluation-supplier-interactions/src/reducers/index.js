import { combineReducers } from 'redux';
import supplierReducer  from './supplierInteractionsReducer';

const ComponentReducer = combineReducers({
    supplierInteractions: supplierReducer,
});

export default ComponentReducer;
