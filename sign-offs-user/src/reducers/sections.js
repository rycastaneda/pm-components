import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: true
};

export function sections(state = INITIAL_STATE, action) {
    let section, index;

    switch (action.type) {
        case action.FETCH_SECTIONS:
            return {
                ...state,
                isLoading: true
            };
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.TOGGLE_SECTION_COLLAPSE:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        isCollapsed: !section.isCollapsed
                    }
                }
            };
        case actions.TOGGLE_MANAGE_SECTION_MODAL:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        isShown: !section.isShown
                    }
                }
            };
        case actions.SWITCH_SECTION_TAB:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        currentTab:
                            action.currentTab === section.currentTab
                                ? null
                                : action.currentTab
                    }
                }
            };
        case actions.TOGGLE_COMMENT_BOX:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        isAddingNewComment: !section.isAddingNewComment
                    }
                }
            };
        case actions.TOGGLE_SECTION_LOADING:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        isLoading: !section.isLoading
                    }
                }
            };
        case actions.SUBMITTED_NEW_COMMENT:
            section = state.byId[action.sectionId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section,
                        commentIds: section.commentIds.concat(action.commentId),
                        isAddingNewComment: false,
                        isLoading: false
                    }
                }
            };
        case actions.DELETED_COMMENT:
            section = state.byId[action.sectionId];
            section.commentIds.splice(
                section.commentIds.indexOf(action.commentId),
                1
            );

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section
                    }
                }
            };
        case actions.ADDED_STAFF_RESPONSE:
            section = state.byId[action.sectionId];
            section.responseIds.push(action.responseId);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section
                    }
                }
            };
        case actions.DELETED_STAFF_RESPONSE:
            section = state.byId[action.sectionId];
            index = section.responseIds.indexOf(action.responseId);
            section.responseIds.splice(index, 1);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...section
                    }
                }
            };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.data.map(section => {
        let commentIds = [];
        let responseIds = [];
        let status = null;

        if (section.relationships) {
            commentIds = section.relationships.comments.data.map(
                comment => comment.id
            );
            responseIds = section.relationships.signOff.data.map(
                signOff => signOff.id
            );
            status = section.relationships['staff-response']
                ? section.relationships['staff-response'].attributes.status
                : null;
        }

        byId[section.id] = {
            id: section.id,
            status,
            isCollapsed: false,
            isAddingNewComment: false,
            isLoading: false,
            isShown: false,
            currentTab: 'questions',
            commentIds,
            responseIds,
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
