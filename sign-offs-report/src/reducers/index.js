import { combineReducers } from 'redux';
import { assignments } from './assignments';
import { preferredSuppliers } from './preferredSuppliers';
import { comments } from './comments';
import { staff } from './staff';
import { suppliers } from './suppliers';
import { panels } from './panels';
import { sections } from './sections';
import { ui } from './ui';

export default combineReducers({
    ui,
    staff,
    assignments,
    preferredSuppliers,
    comments,
    suppliers,
    panels,
    sections
});
