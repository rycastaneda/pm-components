import * as actions from '../constants';
import * as filters from '../constants/filters';

const INITIAL_STATE = {
    error: null,
    orderByField: filters.DEFAULT_ORDER_FIELD,
    orderByDirection: filters.DEFAULT_ORDER_DIRECTION,
    keyword: '',
    filters: {
        assigned_to: '',
        status: []
    },
    isLoading: true,
    page: 1,
    perPage: 30,
    totalPage: 1,
    currentSection: '',
    canViewAll: true
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_PREFERRED_SUPPLIERS:
            return fetchPreferredSuppliers(state, action);
        case actions.RECEIVE_PREFERRED_SUPPLIERS:
            state.isLoading = false;
            state.totalPage = action.assignments.meta.pagination.total_pages;
            return { ...state };
        case actions.TOGGLE_COMMENT_MODAL:
            state.currentSection = action.sectionId;
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

function fetchPreferredSuppliers(state, action) {
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
        isLoading: true,
        orderByField,
        orderByDirection,
        keyword,
        filters,
        page,
        perPage,
        canViewAll,
        currentSection: ''
    };
}
