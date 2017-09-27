import { combineReducers } from 'redux';
import { sections } from './sections';
import { comments } from './comments';
import { staff } from './staff';
import { questions } from './questions';

export default combineReducers({
    sections,
    comments,
    questions,
    staff
});
