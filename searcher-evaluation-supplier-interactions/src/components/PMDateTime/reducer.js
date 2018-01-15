import * as actions from './actionsTypes';

const initialState = {
    dateTimeStart: Date(Date.now()).toLocaleString(),
    dateTimeEnd: Date(Date.now()).toLocaleString(),
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.SUPPLIER_INTERACTIONS_FILTER_DATE_START_CHANGE:
            return {
                ...state,
                dateTimeStart: action.dateTimeStart,
            };

        case actions.SUPPLIER_INTERACTIONS_FILTER_DATE_END_CHANGE:
            return {
                ...state,
                dateTimeEnd: action.dateTimeEnd,
            };

        default:
            return state;

    }
};

export default reducer;
