import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: true
};

export function sections(state = INITIAL_STATE, action) {
    let section;
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            state.isLoading = true;
            return { ...state };
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.RECEIVE_STAFF:
            state.byId[action.sectionId].isLoading = false;
            return { ...state };
        case actions.TOGGLE_SECTION_COLLAPSE:
            section = state.byId[action.sectionId];
            section.isCollapsed = !section.isCollapsed;
            return { ...state };
        case actions.TOGGLE_SECTION_LOADING:
            section = state.byId[action.sectionId];
            section.isLoading = !section.isLoading;
            return { ...state };
        case actions.ASSIGN_STAFF:
            return assignStaff(state, action);
        case actions.REMOVE_STAFF:
            return removeStaff(state, action);
    }
    return state;
}

function receiveSections(state, action) {
    const byId = {};

    let assignmentIdToUserId = {}; // quick mapping of all assignmentId to userId

    if (action.sections.included) {
        action.sections.included
            .filter(include => include.type === 'default-assignments')
            .map(assignment => {
                assignmentIdToUserId[assignment.id] =
                    assignment.relationships.staff.data.id;
            });
    }

    action.sections.data.map(section => {
        let userIdToAssignmentId = {}; // quick mapping for simplified state grouped by section

        let defaultUserIds = [];

        if (section.relationships && section.relationships.defaultAssignments) {
            defaultUserIds = section.relationships.defaultAssignments.data.map(
                assignment => {
                    const userId = assignmentIdToUserId[assignment.id];
                    userIdToAssignmentId[userId] = assignment.id;
                    return userId;
                }
            );
        }

        byId[section.id] = {
            id: section.id,
            isCollapsed: false,
            isLoading: false,
            defaultUserIds,
            userIdToAssignmentId,
            ...section.attributes
        };

        return section;
    });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds,
        isLoading: false
    };
}

function assignStaff(state, action) {
    const section = state.byId[action.sectionId];
    section.isLoading = false;
    section.defaultUserIds.push(action.staffId);
    section.userIdToAssignmentId[action.staffId] = action.assignmentId; // register assignmentId
    return { ...state };
}

function removeStaff(state, action) {
    const section = state.byId[action.sectionId];
    let index = section.defaultUserIds.indexOf(action.staffId);
    section.defaultUserIds.splice(index, 1);
    section.isLoading = false;

    return { ...state };
}
