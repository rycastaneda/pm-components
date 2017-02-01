import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { itemsReducer, itemDetailsReducer, engagementsReducer } from './itemsReducer';

const rootReducer = combineReducers({
    api,
    itemsReducer,
    itemDetailsReducer,
    engagementsReducer
});

export default rootReducer;
