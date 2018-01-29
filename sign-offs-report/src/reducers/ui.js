import * as actions from '../constants';
import * as filters from '../constants/filters';

const INITIAL_STATE = {
    error: null,
    orderByField: filters.DEFAULT_ORDER_FIELD,
    orderByDirection: filters.DEFAULT_ORDER_DIRECTION,
    keyword: '',
    filters: {
        assignee: '',
        status: [0, 1]
    },
    page: 1,
    perPage: 30,
    totalPage: 1,
    currentAssignment: '',
    canViewAll: true
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_ASSIGNMENTS:
            return fetchAssignments(state, action);
        case actions.RECEIVE_ASSIGNMENTS:
            state.totalPage = action.assignments.meta.pagination.total_pages;
            return { ...state };
        case actions.TOGGLE_COMMENT_MODAL:
            state.currentAssignment = action.assignmentId;
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

function fetchAssignments(state, action) {
    const {
        orderByField,
        orderByDirection,
        keyword,
        filters,
        page,
        perPage,
        canViewAll
    } = action;

    return {
        ...state,
        orderByField,
        orderByDirection,
        keyword,
        filters,
        page,
        perPage,
        canViewAll,
        currentAssignment: ''
    };
}
