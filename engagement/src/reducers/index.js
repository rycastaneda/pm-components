import { combineReducers } from 'redux';
import { itemsReducer, itemDetailsReducer, engagementsReducer } from './itemsReducer';
import { ui } from './ui';

const rootReducer = combineReducers({
    ui,
    itemsReducer,
    itemDetailsReducer,
    engagementsReducer
});

export default rootReducer;
