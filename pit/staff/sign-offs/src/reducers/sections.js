import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: [],
    loading: true
};


export function sections(state = INITIAL_STATE, action) {
    switch (action.type) {
        case action.FETCH_SECTIONS: 
            return {
                ...state,
                loading: true
            };
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.TOGGLE_SECTION:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...state.byId[action.sectionId],
                        isCollapsed: !state.byId[action.sectionId].isCollapsed
                    }
                }
            };
        case actions.TOGGLE_STATUS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...state.byId[action.sectionId],
                        status: action.status
                    }
                }
            }; 
        case actions.SWITCH_TAB: 
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...state.byId[action.sectionId],
                        currentTab: action.currentTab
                    }
                }
            };
        case actions.TOGGLE_COMMENT_BOX:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.sectionId]: {
                        ...state.byId[action.sectionId],
                        isAddingNewComment: !state.byId[action.sectionId].isAddingNewComment
                    }
                }
            };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};

    action.sections.data
        .map((section) => {
            const questionIds = [];
            let commentIds = [];

            if (section.relationships.comments) {
                commentIds = section.relationships.comments.data.map(comment => comment.id);
            }

            const answers = section.relationships.questions.data.map((question) => {
                questionIds.push(question.id);
                return {
                    questionId: question.id,
                    answer: question.answer
                };
            });

            byId[section.id] = {
                id: section.id,
                status: section.relationships['staff-response'] ? section.relationships['staff-response'].attributes.status : null,
                isCollapsed: false,
                isAddingNewComment: false,
                currentTab: null,
                answers,
                commentIds,
                ...section.attributes
            };

            return section;
        });

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds,
        loading: false
    };
}