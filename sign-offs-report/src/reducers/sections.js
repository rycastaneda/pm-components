import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function sections(state = INITIAL_STATE, action) {
    let section;
    switch (action.type) {
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            return receiveSections(state, action);
        case actions.TOGGLE_COMMENT_MODAL:
            section = state.byId[+action.sectionId];
            section.isShown = !section.isShown;
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const sections = action.assignments.included
        ? action.assignments.included.filter(
              include => include.type === 'compliance-sections'
          )
        : [];

    sections.map(section => {
        state.byId[section.id] = {
            id: section.id,
            title: section.attributes.title,
            commentIds: section.relationships.comments.data.map(
                comment => comment.id
            ),
            assignmentIds: section.relationships.assignments.data.map(
                section => section.id
            ),
            isShown: false
        };

        state.allIds.push(section.id);
    });

    return { ...state, isLoading: false };
}
