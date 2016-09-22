import { GET_CATEGORY_LIST, SELECT_CATEGORY } from '../constants/ActionTypes';
import { combineReducers } from 'redux';

const getCategories = (state = [], action) => {
    if (action.type === GET_CATEGORY_LIST) {
        return state.concat([action.text]);
    } else {
        return state;
    }
};

const selectCategory = (state = [], action) => {
    if (action.type === SELECT_CATEGORY) {
        return state.concat([action.text]);
    } else {
        return state;
    }
};

export default combineReducers({
    getCategories,
    selectCategory
});