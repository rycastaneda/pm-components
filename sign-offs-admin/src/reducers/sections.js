import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: true
};

export function sections(state = INITIAL_STATE, action) {
    let section, index;
    if (action.sectionId) {
        section = state.byId[action.sectionId];
    }

    switch (action.type) {
        case action.FETCH_SECTIONS:
            return {
                ...state,
                isLoading: true
            };
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.RECEIVE_QUESTIONS:
            section.isLoading = false;
            return { ...state };
        case actions.TOGGLE_ALL_SECTION_COLLAPSE:
            return toggleAllSections(state, action);
        case actions.TOGGLE_SECTION_COLLAPSE:
            section.isCollapsed = !section.isCollapsed;
            return { ...state };
        case actions.TOGGLE_MANAGE_SECTION_MODAL:
            section.isShown = !section.isShown;
            return { ...state };
        case actions.SWITCH_SECTION_TAB:
            section.currentTab =
                action.currentTab === section.currentTab
                    ? null
                    : action.currentTab;
            return { ...state };
        case actions.TOGGLE_COMMENT_BOX:
            section.isAddingNewComment = !section.isAddingNewComment;
            return { ...state };
        case actions.TOGGLE_SECTION_LOADING:
            section.isLoading = !section.isLoading;
            return { ...state };
        case actions.SUBMITTED_NEW_COMMENT:
            section.commentIds.push(action.commentId);
            section.isAddingNewComment = false;
            section.isLoading = false;
            return { ...state };
        case actions.DELETED_COMMENT:
            section.commentIds.splice(
                section.commentIds.indexOf(action.commentId),
                1
            );
            return { ...state };
        case actions.ADDED_STAFF_RESPONSE:
            section.responseIds.push(action.responseId);
            return { ...state };
        case actions.DELETED_STAFF_RESPONSE:
            index = section.responseIds.indexOf(action.responseId);
            section.responseIds.splice(index, 1);
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};
    const allIds = [];

    action.sections.data.map(section => {
        let commentIds = [];
        let responseIds = [];
        let defaultUserIds = [];
        let questionIds = [];
        if (section.relationships) {
            commentIds = section.relationships.comments
                ? section.relationships.comments.data.map(comment => comment.id)
                : [];
            responseIds = section.relationships.assignments
                ? section.relationships.assignments.data.map(
                      signOff => signOff.id
                  )
                : [];
            defaultUserIds = section.relationships.defaultAssignments
                ? section.relationships.defaultAssignments.data.map(
                      user => user.id
                  )
                : [];
            questionIds = section.relationships.fields.data.map(
                question => question.id
            );
        }

        byId[section.id] = {
            id: section.id,
            // status: section.relationships['staff-response']
            //     ? section.relationships['staff-response'].attributes.status
            //     : null,
            isCollapsed: false,
            isAddingNewComment: false,
            isLoading: false,
            isShown: false,
            currentTab: 'questions',
            commentIds,
            responseIds,
            defaultUserIds,
            questionIds,
            ...section.attributes
        };

        allIds.push(section.id);

        return section;
    });

    return {
        ...state,
        byId,
        allIds,
        isLoading: false
    };
}

function toggleAllSections(state, action) {
    state.allIds.map(sectionId => {
        state.byId[sectionId].isCollapsed = action.expandAll;
    });

    return { ...state };
}
