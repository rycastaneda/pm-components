import * as actionTypes from './actionsTypes';
import moment from 'moment';

export const updateFilterDateChange = (filterDate) => {

    if (!moment(filterDate).isValid()) {
        return false;
    }

    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_FILTER_DATE_CHANGE,
        dateTime: moment(filterDate).format(),
    }
}

