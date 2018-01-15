import * as actions from './actionsTypes';

const initialState = {
    filterSearchKey: '',
    interactionTypes: ['Any', 'Message', 'Evaluation', 'Rfq', 'Engagement'],
    staffInitiators: ['Any', 'Test staff 1', 'Test staff 2', 'Test staff 3'],
    interactionTypeSelected: 'Any',
    initiatedBySelected: 'Any',
    toggleFilterShow: false,
    isLoading: false,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.SUPPLIER_INTERACTIONS_FILTER_SEARCH_UPDATE:

            return {
                ...state,
                filterSearchKey: action.searchKey,
            };

        case actions.SUPPLIER_INTERACTIONS_FILTER_INTERACTION_TYPE:

            return {
                ...state,
                interactionTypeSelected: action.interactionTypeSelected,
            };

        case actions.SUPPLIER_INTERACTIONS_FILTER_INITIATED_BY_CHANGE:

            return {
                ...state,
                initiatedBySelected: action.initiatedBySelected,
            };


        case actions.SUPPLIER_INTERACTIONS_SUBMIT_NORMAL:

            return {
                ...state,
                isLoading: true,
            };

        case actions.SUPPLIER_INTERACTIONS_SUBMIT_ADVANCED:

            return {
                ...state,
                isLoading: true,
            };

        case actions.SUPPLIER_INTERACTIONS_SUBMIT_SUCCESS:

            return {
                ...state,
                isLoading: false,
            };

        case actions.SUPPLIER_INTERACTIONS_SHOW_FILTER_TOGGLE:

            return {
                ...state,
                toggleFilterShow: !state.toggleFilterShow,
            };

        default:
            return state;

    }
};

export default reducer;
