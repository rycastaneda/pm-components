import { combineReducers } from 'redux';
import { requestedDocuments } from './requestedDocuments';
import { documentSuggestions } from './documentSuggestions';

export default combineReducers({
    requestedDocuments,
    documentSuggestions
});
