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

        case actions.EVALUATION_TEMPLATES_FILTER_DATE_START_CHANGE:
            return {
                ...state,
                dateTimeStart: action.dateTimeStart,
            };

        case actions.EVALUATION_TEMPLATES_FILTER_DATE_END_CHANGE:
            return {
                ...state,
                dateTimeEnd: action.dateTimeEnd,
            };

        case actions.EVALUATION_TEMPLATES_DATE_RANGE_VALID_SUCCESS:
            return {
                ...state,
                isDateRangeValid: true,
            };

        case actions.EVALUATION_TEMPLATES_DATE_RANGE_VALID_FAIL:
            return {
                ...state,
                isDateRangeValid: false,
            };

        case actions.EVALUATION_TEMPLATES_DATE_RANGE_RESET:
            return {
                ...state,
                dateTimeStart: null,
                dateTimeEnd: null,
                isDateRangeValid: false,
            };

        default:
            return state;

    }
};

export default reducer;