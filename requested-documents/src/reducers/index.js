import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { requestedDocuments } from './requestedDocuments';
import { documentSuggestions } from './documentSuggestions';

export default combineReducers({
    api,
    requestedDocuments,
    documentSuggestions
});