import * as actions from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    isLoading: true
};

export function assignments(state = INITIAL_STATE, action) {
    let assignment;
    switch (action.type) {
        case actions.FETCH_SECTIONS:
            return {
                ...state,
                isLoading: true
            };
        case actions.DOWNLOADED_ASSIGNMENTS:
            return {
                ...state,
                isLoading: false
            };
        case actions.TOGGLE_COMMENT_MODAL:
            assignment = state.byId[action.assignmentId];
            assignment.isShown = !assignment.isShown;
            return { ...state };
        case actions.RECEIVE_ASSIGNMENTS:
            return receiveAssignments(state, action);
        case actions.RECEIVE_COMMENT:
            assignment = state.byId[action.assignmentId];
            assignment.commentIds = action.comments.data.map(
                comment => comment.id
            );
            return { ...state };
        case actions.API_ERROR:
            return {
                ...state,
                error:
                    action.error ||
                    'Something went wrong. Please try again later.'
            };
    }

    return state;
}

function receiveAssignments(state, action) {
    const byId = {};
    const allIds = [];
    action.assignments.data.map(report => {
        byId[report.id] = {
            id: report.id,
            ...report.attributes,
            lastUpdated: report.attributes.last_updated,
            status: report.attributes.status_label,
            sectionId: report.attributes.section_id,
            preferredSupplierId: report.attributes.preferred_supplier_id,
            commentIds: [],
            isShown: false
        };

        allIds.push(report.id);
    });

    return {
        byId,
        allIds,
        isLoading: false
    };
}
