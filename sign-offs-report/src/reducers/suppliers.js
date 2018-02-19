import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function suppliers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receivePreferredSuppliers(state, action);
    }

    return state;
}

function receivePreferredSuppliers(state, action) {
    const byId = {};
    const allIds = [];

    const suppliers = action.assignments.included
        ? action.assignments.included.filter(
              include => include.type === 'suppliers'
          )
        : [];

    suppliers.map(supplier => {
        byId[supplier.id] = {
            id: supplier.id,
            ...supplier.attributes
        };
        allIds.push(supplier.id);
    });

    return {
        byId,
        allIds
    };
}
