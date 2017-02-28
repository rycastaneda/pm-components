import { combineReducers } from 'redux';
import { itemsReducer, itemDetailsReducer, engagementsReducer } from './itemsReducer';

const rootReducer = combineReducers({
    itemsReducer,
    itemDetailsReducer,
    engagementsReducer
});

export default rootReducer;
