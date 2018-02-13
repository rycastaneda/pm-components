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
            return { ...state };
        case actions.ADDED_STAFF_RESPONSE:
            state.byId[action.responseId] = {
                statusId: action.statusId,
                staffId: action.staffId
            };
            state.allIds.push(action.responseId);
            return { ...state };
        case actions.DELETED_STAFF_RESPONSE:
            return removeResponse(state, action);
        default:
            return state;
    }
}

function removeResponse(state, action) {
    const ids = {};

    Object.keys(state.byId).map(responseId => {
        if (+responseId === action.responseId) {
            return;
        }

        ids[responseId] = state.byId[responseId];
    });

    let index = state.allIds.indexOf(action.groupId);
    state.allIds.splice(index, 1);

    return {
        ...state,
        byId: ids
    };
}

function receiveSections(state, action) {
    const byId = {};

    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'compliance-assignments')
            .map(include => {
                byId[include.id] = {
                    statusId: include.attributes.status,
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
