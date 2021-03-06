import { combineReducers } from 'redux';
import { sections } from './sections';
import { ui } from './ui';
import { staff } from './staff';

export default combineReducers({
    sections,
    staff,
    ui
});
