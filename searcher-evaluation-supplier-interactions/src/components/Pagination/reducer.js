import * as actions from './actionsTypes';

const initialState = {
    pages: {},
    maxRowsList: ['1', '2', '3'],
    maxRowsSelected: '1',
    pageSelected: '1',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SUPPLIER_INTERACTIONS_INIT_PAGES:
            return {
                ...state,
                pages: action.pages,
            };

        case actions.SUPPLIER_INTERACTIONS_SHOW_ROWS_CHANGE_UPDATE:
            return {
                ...state,
                maxRowsSelected: action.rows,
            };

        case actions.SUPPLIER_INTERACTIONS_ON_PAGE_UPDATE_CHANGE:
            return {
                ...state,
                pageSelected: action.pageSelected,
            };

        default:
            return state;
    }
};

export default reducer;
