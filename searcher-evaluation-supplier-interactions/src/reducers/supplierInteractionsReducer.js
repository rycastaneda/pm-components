import * as actions from '../constants/ActionTypes';

const initialState = {
    interactions: [],
    isLoading: false,
    maxRows: [10, 15, 30],
};

const reducer = (state = initialState, action) => {
    debugger
    switch (action.type) {

        case actions.SUPPLIER_INTERACTIONS_REQUEST_START:
            debugger
            return {
                ...state,
                isLoading: true,
            };

        case actions.SUPPLIER_INTERACTIONS_REQUEST_SUCCESS:

            return {
                ...state,
                interactions: action.interactions,
                isLoading: false,
            };

        default:
            return state;

        }
};

export default reducer;
