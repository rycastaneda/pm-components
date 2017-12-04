import * as actions from './actionsTypes';

const initialState = {
    dateTime: '',
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.SUPPLIER_INTERACTIONS_FILTER_DATE_CHANGE:
            return {
                ...state,
                dateTime: action.dateTime,
            };

        default:
            return state;

    }
};

export default reducer;
