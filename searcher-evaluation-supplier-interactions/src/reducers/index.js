import { combineReducers } from 'redux';
import supplierReducer  from './supplierInteractionsReducer';
import interactionsFilterReducer from '../components/SupplierInteractionsFilter/reducer';

const ComponentReducer = combineReducers({
    supplierInteractions: supplierReducer,
    interactionsFilter: interactionsFilterReducer,
});

export default ComponentReducer;
