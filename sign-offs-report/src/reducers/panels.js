import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function panels(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receivePanels(state, action);
    }

    return state;
}

function receivePanels(state, action) {
    const panels = action.assignments.included
        ? action.assignments.included.filter(
              include => include.type === 'panels'
          )
        : [];
    panels.map(panel => {
        state.byId[panel.id] = {
            id: panel.id,
            ...panel.attributes,
            sectionIds: panel.relationships.complianceSections.data.map(
                section => section.id
            )
        };

        state.allIds.push(panel.id);
    });

    return { ...state, isLoading: false };
}
