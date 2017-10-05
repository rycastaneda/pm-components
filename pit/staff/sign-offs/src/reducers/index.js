import { combineReducers } from 'redux';
import { sections } from './sections';
import { comments } from './comments';
import { staff } from './staff';
import { questions } from './questions';
import { ui } from './ui';

export default combineReducers({
    sections,
    comments,
    questions,
    ui,
    staff
});
