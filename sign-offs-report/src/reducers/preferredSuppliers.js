import * as actions from '../constants';
import { format } from 'date-fns';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: false
};

export function preferredSuppliers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receivePreferredSuppliers(state, action);
        case actions.TOGGLE_SUPPLIER_ROW:
            state.byId[action.supplierId].isOpen = !state.byId[
                action.supplierId
            ].isOpen;
            return { ...state };
        case actions.DOWNLOADED_PREFERRED_SUPPLIERS:
            return {
                ...state,
                isLoading: false
            };
    }

    return state;
}

function receivePreferredSuppliers(state, action) {
    let byId = {};
    let allIds = [];

    action.assignments.data.map(prefSupplier => {
        byId[prefSupplier.id] = {
            id: +prefSupplier.id,
            ...prefSupplier.attributes,
            dateApplied: prefSupplier.attributes.submitted_on
                ? format(prefSupplier.attributes.submitted_on, 'MM-DD-YYYY')
                : 'Not Available',
            isOpen: false,
            supplierId: prefSupplier.relationships.supplier.data.id,
            panelIds: prefSupplier.relationships.panels.data.map(
                panel => panel.id
            )
        };

        if (!allIds.includes(prefSupplier.id)) {
            allIds.push(prefSupplier.id);
        }
    });

    return { byId, allIds, isLoading: false };
}

export function getPreferredSuppliers(state) {
    const {
        preferredSuppliers: rawPrefSuppliers,
        panels: rawPanels,
        sections: rawSections,
        assignments: rawAssignments,
        suppliers: rawSuppliers,
        staff: rawStaff,
        comments: rawComments
    } = state;

    let count = 0;

    function getAssignment(assignmentId) {
        let assignment = rawAssignments.byId[assignmentId];
        return { ...assignment, assignedTo: rawStaff.byId[assignment.staffId] };
    }

    function getComment(commentId) {
        let comment = rawComments.byId[commentId];
        return { ...comment, staff: rawStaff.byId[comment.staffId] };
    }

    function getSection(sectionId) {
        let section = rawSections.byId[sectionId];
        return {
            ...section,
            assignments: section.assignmentIds.map(getAssignment),
            comments: section.commentIds.map(getComment)
        };
    }

    function getPanel(panelId) {
        let panel = rawPanels.byId[panelId];
        count += panel.sectionIds.length;
        return { ...panel, sections: panel.sectionIds.map(getSection) };
    }

    return rawPrefSuppliers.allIds
        .map(supplierId => {
            let supplier = rawPrefSuppliers.byId[supplierId];
            count = 0;
            return {
                ...supplier,
                title: rawSuppliers.byId[supplier.supplierId].title,
                panels: supplier.panelIds.map(getPanel),
                count
            };
        })
        .filter(supplier => supplier.panels.length);
}
