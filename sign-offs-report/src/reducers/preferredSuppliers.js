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
    let { byId, allIds } = state;

    if (action.type === actions.RECEIVE_PREFERRED_SUPPLIERS) {
        allIds = [];
    }

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

    return rawPrefSuppliers.allIds
        .map(supplierId => {
            let supplier = rawPrefSuppliers.byId[supplierId];

            function getPanels(sectionId) {
                return rawPanels.allIds
                    .filter(panelId => {
                        let panel = rawPanels.byId[panelId];
                        return panel.sectionIds.includes(sectionId);
                    })
                    .map(panelId => rawPanels.byId[panelId]);
            }

            function getComment(commentId) {
                let comment = rawComments.byId[commentId];
                return { ...comment, staff: rawStaff.byId[comment.staffId] };
            }

            function getSection(assignmentId) {
                return rawSections.allIds
                    .filter(sectionId => {
                        let section = rawSections.byId[sectionId];
                        return section.assignmentIds.includes(assignmentId);
                    })
                    .map(sectionId => rawSections.byId[sectionId])
                    .pop();
            }

            function getAssignments() {
                return rawAssignments.allIds
                    .map(assignmentId => {
                        let assignment = rawAssignments.byId[assignmentId];
                        let section = getSection(assignmentId);
                        let panels = getPanels(section.id);
                        let staff = rawStaff.byId[+assignment.staffId];
                        return {
                            ...assignment,
                            id: +assignmentId,
                            lastUpdated: format(assignment.lastUpdated, 'MM-DD-YYYY'),
                            comments: section.commentIds.map(getComment),
                            sectionId: +section.id,
                            sectionTitle: section.title,
                            panels,
                            staffName: staff
                                ? `${staff.first_name} ${staff.last_name}`
                                : ''
                        };
                    })
                    .filter(
                        assignment =>
                            assignment.preferredSupplierId === +supplierId
                    );
            }

            return {
                id: +supplierId,
                title: rawSuppliers.byId[supplier.supplierId].title,
                panels: supplier.panelIds
                    .map(panelId => rawPanels.byId[panelId]),
                dateApplied: supplier.dateApplied,
                status: supplier.status,
                isOpen: supplier.isOpen,
                assignments: getAssignments()
            };
        })
        .filter(supplier => {
            return supplier.assignments.length;
        });
}
