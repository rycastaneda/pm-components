import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { groups } from './groups';
import { documents } from './documents';
import { requestedItems } from './requestedItems';
import { ui } from './ui';

export default combineReducers({
    api,
    groups,
    documents,
    ui,
    requestedItems
});