import { combineReducers } from 'redux';
import { assignments } from './assignments';
import { comments } from './comments';
import { staff } from './staff';
import { ui } from './ui';

export default combineReducers({
    ui,
    staff,
    assignments,
    comments
});
