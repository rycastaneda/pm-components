import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { documentGroups } from './document-groups';
import { documents } from './documents';
import { documentsToBeAdded } from './documentsToBeAdded';

export default combineReducers({
    api,
    documentGroups,
    documents,
    documentsToBeAdded
});