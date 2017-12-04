import { combineReducers } from 'redux';
import supplierReducer  from './supplierInteractionsReducer';
import interactionsFilterReducer from '../components/SupplierInteractionsFilter/reducer';
import pmDateTimeReducer from '../components/PMDateTime/reducer';

const ComponentReducer = combineReducers({
    supplierInteractions: supplierReducer,
    interactionsFilter: interactionsFilterReducer,
    pmDateTime: pmDateTimeReducer,
});

export default ComponentReducer;
