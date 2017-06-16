/* global $ */

import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_ERROR,
    VALIDATION_ERROR,
    RESET_ERROR,
    DISPLAY_SUCCESS,
    DISPLAY_SUCCESS_QUOTEMODAL,
    RESET_SUCCESS
} from '../constants/ActionTypes';

import moment from 'moment';

function convertToCurrency(value) {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function scrollToTop(spot) {
    if (spot === 'supplier-item') {
        $('.quote-modal-overflow').animate({
            scrollTop: 0
        }, 500);
    } else if ($('#engagements').length) {
        $('html, body').animate({
            scrollTop: $('#engagements').offset().top - 70
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
    return (dispatch, getState) => {
        const spot = getState().itemsReducer.spot;
        scrollToTop(spot);
        dispatch({
            type: REQUEST_ERROR,
            error: errorMessage
        });
    };
}

export function validationError(message) {
    return (dispatch, getState) => {
        const spot = getState().itemsReducer.spot;
        scrollToTop(spot);
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

export function displaySuccessQuoteModal(message) {
    return (dispatch) => {
        dispatch({
            type: DISPLAY_SUCCESS_QUOTEMODAL,
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

export function isValidEngagement(dispatch, currentEngagement, pricingOptions, engagementLimit, editMode) {
    dispatch(resetError());
    let pricing = pricingOptions && pricingOptions.filter((pricingOption) => {
        if (editMode) {
            return +pricingOption.attributes.unit && pricingOption.attributes.selected;
        } else {
            return pricingOption.attributes.unit && pricingOption.attributes.selected;
        }
    });
    let invalidPrices = pricing && pricing.filter(pricingOption => +pricingOption.attributes.unit <= 0);
    if (pricingOptions && !pricing.length) {
        dispatch(validationError('Please provide Estimate'));
        return false;
    }
    if (!editMode && invalidPrices && invalidPrices.length) {
        dispatch(validationError('Please provide correct Estimate values'));
        return false;
    }
    if (engagementLimit !== null) {
        let totalPrice = pricing.map(function(price) {
            return +price.attributes.value * +price.attributes.unit;
        }).reduce(function(total, price) {
            return total + price;
        }, 0);
        if (totalPrice > engagementLimit) {
            dispatch(validationError(`This value exceeds the approved limit for spot engagements. Please create a Request for Quotation to facilitate engagements greater than $${convertToCurrency(engagementLimit)} in value.`));
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
