import * as actions from './actionsTypes';
import * as reactDatesConstants from './const';
// import moment from 'moment';

const initialState = {
    dateTimeStart: null, // moment(Date.now()).format('MM/DD/YYYY'),
    dateTimeEnd: null,   // moment(Date.now()).format('MM/DD/YYYY'),
    focusedInput: reactDatesConstants.START_DATE,
    isDateRangeValid: false,
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


        case actions.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_SUCCESS:
            return {
                ...state,
                isDateRangeValid: true,
            };

        case actions.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_FAIL:
            return {
                ...state,
                isDateRangeValid: false,
            };

        default:
            return state;

    }
};

export default reducer;