import { combineReducers } from 'redux';
import { documentGroups } from './document-groups';
import { documents } from './documents';
import { ui } from './ui';

export default combineReducers({
    documentGroups,
    documents,
    ui
});
