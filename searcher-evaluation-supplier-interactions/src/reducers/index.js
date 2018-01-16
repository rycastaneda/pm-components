import { combineReducers } from 'redux';
import supplierReducer from '../components/SupplierInteractions/reducer';
import interactionsFilterReducer from '../components/SupplierInteractionsFilter/reducer';
import pmDateTimeReducer from '../components/PMDateRange/reducer';
import paginationReducer from '../components/Pagination/reducer';

const ComponentReducer = combineReducers({
    supplierInteractions: supplierReducer,
    interactionsFilter: interactionsFilterReducer,
    pmDateTime: pmDateTimeReducer,
    pagination: paginationReducer,
});

export default ComponentReducer;
