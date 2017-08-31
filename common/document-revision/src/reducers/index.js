import { combineReducers } from 'redux';
import { revisions } from './revisions';
import { ui } from './ui';

export default combineReducers({
    revisions,
    ui
});
