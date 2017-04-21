import { combineReducers } from 'redux';
import { itemsReducer, itemDetailsReducer, engagementsReducer } from './itemsReducer';
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
