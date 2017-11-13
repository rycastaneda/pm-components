import { combineReducers } from 'redux';
import { groups } from './groups';
import { documents } from './documents';
import { requestedItems } from './requestedItems';
import { ui } from './ui';

export default combineReducers({
    groups,
    documents,
    ui,
    requestedItems
});