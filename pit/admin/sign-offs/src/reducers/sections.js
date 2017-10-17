import * as actions from '../constants';

const INITIAL_STATE = { 
    byId: {},
    allIds: [],
    isLoading: true
};


export function sections(state = INITIAL_STATE, action) {
    switch (action.type) {
        case action.FETCH_SECTIONS: 
            return {
                ...state,
                isLoading: true
            };
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.TOGGLE_SECTION_COLLAPSE:
            state.byId[action.sectionId].isCollapsed =  !state.byId[action.sectionId].isCollapsed;
            return { ...state };
        case actions.SWITCH_SECTION_TAB: 
            state.byId[action.sectionId].currentTab = action.currentTab === state.byId[action.sectionId].currentTab ? 
                null : action.currentTab;
            return { ...state };
        case actions.TOGGLE_COMMENT_BOX:
            state.byId[action.sectionId].isAddingNewComment = !state.byId[action.sectionId].isAddingNewComment;
            return { ...state };
        case actions.TOGGLE_SECTION_LOADING:
            state.byId[action.sectionId].isLoading = !state.byId[action.sectionId].isLoading;
            return { ...state };
        case actions.TOGGLE_MANAGE_SECTION_MODAL:
            state.byId[action.sectionId].isShown = !state.byId[action.sectionId].isShown;
            return { ...state };
        case actions.SUBMITTED_NEW_COMMENT: 
        case actions.DELETED_COMMENT:
            state.byId[action.sectionId] = comments(state.byId[action.sectionId], action);
            return { ...state };
        case actions.TOGGLE_STAFF_STATUS: 
        case actions.ADDED_STAFF_RESPONSE: 
        case actions.DELETED_STAFF_RESPONSE: 
            state.byId[action.sectionId] = staff(state.byId[action.sectionId], action);
            return { ...state };
    }

    return state;
}

function comments(section, action) {
    switch (action.type) {
        case actions.SUBMITTED_NEW_COMMENT: 
            section.commentIds.push(action.commentId);
            section.isAddingNewComment = false;
            section.isLoading = false;

            return section;
        case actions.DELETED_COMMENT:
            section.commentIds.splice(section.commentIds.indexOf(action.commentId), 1);
            return section;
    }

    return section;
} 

function staff(section, action) {
    let responses = {};

    switch (action.type) {
        case actions.TOGGLE_STAFF_STATUS: 
            section.responses[action.staffId] =  action.status;
            return section;
        case actions.ADDED_STAFF_RESPONSE: 
            section.responses[action.staffId] =  'Pending';
            return section;
        case actions.DELETED_STAFF_RESPONSE:
            Object.keys(section.responses).map((staffId) => {
                if (+staffId === action.staffId) {
                    return;
                }

                responses[+staffId] = section.responses[+staffId];
            });

            section.responses = responses;
            return section;
    }

    return section;
}

function receiveSections(state, action) {
    const byId = {};
    const allIds = [];

    action.sections.data
        .map((section) => {
            const questionIds = [];
            let commentIds = [];
            let responses = {};

            if (section.relationships.comments) {
                commentIds = section.relationships.comments.data.map(comment => comment.id);
            }

            if (section.relationships['staff-response']) {
                section.relationships['staff-response'].map((response) => {
                    responses[response.attributes.staffId] = response.attributes.status;
                });
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
                isCollapsed: false,
                isAddingNewComment: false,
                isLoading: false,
                isShown: false,
                currentTab: 'questions',
                responses,
                answers,
                commentIds,
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

