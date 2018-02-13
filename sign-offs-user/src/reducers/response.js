import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function response(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.CHANGE_STAFF_RESPONSE:
            state.byId[action.responseId].statusId = action.statusId;
            state.byId[action.responseId].status = action.status;
            return { ...state };
        default:
            return state;
    }
}

function receiveSections(state, action) {
    const byId = {};
    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'compliance-assignments')
            .map(include => {
                byId[include.id] = {
                    statusId: include.attributes.status,
                    status: include.attributes.status_label,
                    staffId: include.relationships.assignedStaff.data.id
                };
                return include;
            });
    }

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds
    };
}
