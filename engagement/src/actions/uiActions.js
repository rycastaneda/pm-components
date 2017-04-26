import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_ERROR,
    VALIDATION_ERROR,
    RESET_ERROR,
    DISPLAY_SUCCESS,
    RESET_SUCCESS
} from '../constants/ActionTypes';

import moment from 'moment';

function convertToCurrency(value) {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function scrollToError(spot) {
    if (spot === 'qr-details') {
        window.jQuery('html, body').animate({
            scrollTop: window.jQuery('#engagements').offset().top
        }, 500);
    } else {
        window.jQuery('.quote-modal-overflow').animate({
            scrollTop: 0
        }, 500);
    }
}

export function requestStarted() {
    return (dispatch) => {
        dispatch({
            type: REQUEST_STARTED
        });
    };
}

export function requestCompleted() {
    return (dispatch) => {
        dispatch({
            type: REQUEST_COMPLETED
        });
    };
}

export function requestError(error) {
    const errorMessage = error.response && error.response.data || error;
    return (dispatch) => {
        dispatch({
            type: REQUEST_ERROR,
            error: errorMessage
        });
    };
}

export function validationError(message) {
    return (dispatch, getState) => {
        const spot = getState().itemsReducer.spot;
        scrollToError(spot);
        dispatch({
            type: VALIDATION_ERROR,
            message
        });
    };
}

export function resetError() {
    return (dispatch) => {
        dispatch({
            type: RESET_ERROR
        });
    };
}

export function displaySuccess(message) {
    return (dispatch) => {
        dispatch({
            type: DISPLAY_SUCCESS,
            message
        });
    };
}

export function resetSuccess() {
    return (dispatch) => {
        dispatch({
            type: RESET_SUCCESS
        });
    };
}

export function isValidEngagement(dispatch, currentEngagement, pricingOptions, engagementLimit) {
    dispatch(resetError());
    let pricing = pricingOptions && pricingOptions.filter(pricingOption => pricingOption.attributes.selected);
    if (pricingOptions && !pricing.length) {
        dispatch(validationError('Please provide values for "Estimated Unit(s)"'));
        return false;
    }
    if (engagementLimit) {
        let totalPrice = pricing.map(function(price) {
            return +price.attributes.value * +price.attributes.unit;
        }).reduce(function(total, price) {
            return total + price;
        }, 0);
        if (totalPrice > engagementLimit) {
            dispatch(validationError(`This value exceeds the approved limit for spot engagements. Please create a Quote Request to facilitate engagements greater than $${convertToCurrency(engagementLimit)} in value.`));
            return false;
        }
    }
    if (currentEngagement && !currentEngagement.attributes['purchase-order']) {
        dispatch(validationError('Please provide a value for "Work Order"'));
        return false;
    }
    if (currentEngagement && !moment(currentEngagement.attributes['plan-start-date'], 'YYYY-MM-DD', true).isValid()) {
        dispatch(validationError('Please provide a valid date for "Planned Start Date"'));
        return false;
    }
    return true;
}
