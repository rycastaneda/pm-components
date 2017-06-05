import { combineReducers } from 'redux';
import { requirements } from './requirements';
import { documents } from './documents';
import { groups } from './groups';
import { ui } from './ui';

export default combineReducers({
    requirements,
    documents,
    groups,
    ui
});
