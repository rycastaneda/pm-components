import { combineReducers } from 'redux';
import { itemsReducer, itemDetailsReducer } from './itemsReducer';
import { engagementsReducer } from './engagementsReducer';
import { ui } from './ui';
import { modal } from './modal';

const rootReducer = combineReducers({
    ui,
    modal,
    itemsReducer,
    itemDetailsReducer,
    engagementsReducer
});

export default rootReducer;
