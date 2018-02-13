import { combineReducers } from 'redux';
import { sections } from './sections';
import { comments } from './comments';
import { staff } from './staff';
import { questions } from './questions';
import { response } from './response';
import { uploads } from './uploads';
import { ui } from './ui';

export default combineReducers({
    sections,
    comments,
    questions,
    response,
    ui,
    uploads,
    staff
});
