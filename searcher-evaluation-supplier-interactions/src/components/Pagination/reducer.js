import * as actions from './actionsTypes';

const initialState = {
    pages: {},
    links: {},
    maxRowsList: ['10', '15', '30'],
    maxRowsSelected: '1',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SUPPLIER_INTERACTIONS_INIT_PAGES:
            return {
                ...state,
                pages: action.pages,
                links: action.links,
            };

        case actions.SUPPLIER_INTERACTIONS_SHOW_ROWS_CHANGE_UPDATE:
            return {
                ...state,
                maxRowsSelected: action.rows,
            };

        default:
            return state;
    }
};

export default reducer;
