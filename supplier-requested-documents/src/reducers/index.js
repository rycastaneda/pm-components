import { combineReducers } from 'redux';
import { requirementsDocuments } from './requested-documents';
import { documentsToBeAdded } from './documentsToBeAdded';
import { ui } from './ui';

export default combineReducers({
    requirementsDocuments,
    documentsToBeAdded,
    ui
});