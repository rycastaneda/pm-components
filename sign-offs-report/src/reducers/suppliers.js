import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function suppliers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_ASSIGNMENTS:
            return receiveAssignments(state, action);
        case actions.TOGGLE_SUPPLIER_ROW:
            state.byId[action.supplierId].isOpen = !state.byId[
                action.supplierId
            ].isOpen;
            return { ...state };
    }

    return state;
}

function receiveAssignments(state, action) {
    const byId = {};
    const allIds = [];
    action.assignments.data.map(report => {
        let supplier = byId[report.attributes.preferred_supplier_id];
        if (supplier) {
            supplier.assignmentIds.push(report.id);
            return;
        }

        byId[report.attributes.preferred_supplier_id] = {
            id: report.attributes.preferred_supplier_id,
            supplierTitle: report.attributes.supplier,
            isOpen: false,
            assignmentIds: [report.id]
        };

        allIds.push(report.attributes.preferred_supplier_id);
    });

    return {
        byId,
        allIds
    };
}
