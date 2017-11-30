import { combineReducers } from 'redux';
import { evaluation } from './evaluation';
import { criterion } from './criterion';
import { questions } from './questions';
import { staff } from './staff';
import { comments } from './comments';
import { ui } from './ui';

export default combineReducers({
    evaluation,
    criterion,
    questions,
    staff,
    comments,
    ui
});
