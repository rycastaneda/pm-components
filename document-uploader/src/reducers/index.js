import { combineReducers } from 'redux';
import { documentGroups } from './document-groups';
import { documents } from './documents';
import { documentsToBeAdded } from './documentsToBeAdded';
import { ui } from './ui';

export default combineReducers({
    documentGroups,
    documents,
    documentsToBeAdded,
    ui
});
