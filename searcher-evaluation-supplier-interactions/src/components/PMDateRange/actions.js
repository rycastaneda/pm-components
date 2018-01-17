import * as actionTypes from './actionsTypes';
import moment from 'moment';

export const validateDateRange = () => (dispatch, getState) => {
    const { dateTimeEnd, dateTimeStart } = getState().pmDateTime;

    if (dateTimeEnd !== null && dateTimeStart !== null) {
        dispatch({
            type: actionTypes.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_SUCCESS,
        });

        return;
    }

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_FAIL,
    });
};

export const updateFilterStartDateChange = filterDate => (dispatch) => {

    if (!moment(filterDate).isValid()) {
        dispatch({
            type: actionTypes.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_FAIL,
        });
        dispatch({
            type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_START_CHANGE,
            dateTimeStart: null,
        });
        return false;
    }

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_START_CHANGE,
        dateTimeStart: moment(filterDate).format('YYYY-MM-DD'),
    });

    dispatch(validateDateRange());
};

export const updateFilterEndDateChange = filterDate => (dispatch) => {

    if (!moment(filterDate).isValid()) {
        dispatch({
            type: actionTypes.SUPPLIER_INTERACTIONS_DATE_RANGE_VALID_FAIL,
        });
        dispatch({
            type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_END_CHANGE,
            dateTimeEnd: null,
        });
        return false;
    }

    dispatch({
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_END_CHANGE,
        dateTimeEnd: moment(filterDate).format('YYYY-MM-DD'),
    });

    dispatch(validateDateRange());
};



