import { combineReducers } from 'redux';
import { evaluation } from './evaluation';
import { criterion } from './criterion';
import { questions } from './questions';
import { staff } from './staff';
import { comments } from './comments';
import { entity } from './entity';
import { assignments } from './assignments';
import { uploads } from './uploads';
import { ui } from './ui';

export default combineReducers({
    assignments,
    evaluation,
    criterion,
    questions,
    staff,
    comments,
    uploads,
    ui,
    entity
});
