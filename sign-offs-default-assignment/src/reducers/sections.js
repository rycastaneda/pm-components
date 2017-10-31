import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: true
};

export function sections(state = INITIAL_STATE, action) {
    let section, index;

    switch (action.type) {
        case action.FETCH_SECTIONS:
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
            section = state.byId[action.sectionId];
            section.isLoading = false;
            section.defaultUserIds.push(action.staffId);
            return { ...state };
        case actions.REMOVE_STAFF:
            section = state.byId[action.sectionId];
            section.isLoading = false;
            index = section.defaultUserIds.indexOf(action.staffId);
            section.defaultUserIds.splice(index, 1);
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};

    let defaultUsers = {};
    action.sections.included
        .filter(include => include.type === 'default-users')
        .map(defaultUser => {
            defaultUsers[defaultUser.id] =
                defaultUser.relationships.staff.data.id;
        });

    action.sections.data.map(section => {
        const defaultUserIds = section.relationships.defaultUsers.data.map(
            user => defaultUsers[user.id]
        );

        byId[section.id] = {
            id: section.id,
            isCollapsed: false,
            isLoading: false,
            defaultUserIds,
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
