import * as actions from './actionsTypes';

const initialState = {
    pages: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SUPPLIER_INTERACTIONS_INIT_PAGES:
            return {
                ...state,
                pages: actions.pages,
            };

        default:
            return state;
    }
};

export default reducer;
