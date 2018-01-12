import * as actionTypes from './actionsTypes';
import moment from 'moment';

export const updateFilterStartDateChange = (filterDate) => {
    if (!moment(filterDate).isValid()) {
        return false;
    }

    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_START_CHANGE,
        dateTimeStart: moment(filterDate).format(),
    };
};

export const updateFilterEndDateChange = (filterDate) => {
    if (!moment(filterDate).isValid()) {
        return false;
    }

    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_END_CHANGE,
        dateTimeEnd: moment(filterDate).format(),
    };
};
