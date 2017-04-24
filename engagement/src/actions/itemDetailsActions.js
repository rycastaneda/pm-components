import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_ERROR,
    VALIDATION_ERROR,
    RESET_ERROR,
    DISPLAY_SUCCESS,
    RESET_SUCCESS,
    UPDATE_SUGGESTION,
    RECEIVE_NEW_ENGAGEMENT,
    RESET_ITEM_DETAILS,
    PRICING_OPTIONS_RECEIVED,
    UPDATE_TEXT,
    UPDATE_PRICING_OPTION,
    UPDATE_PURCHASE_ORDER,
    UPDATE_PLAN_DATE,
    UPDATE_ENGAGEMENT_TEXT,
    UPDATED_ENGAGEMENT,
    UPDATED_ENGAGEMENT_DETAILS,
    ADD_ENGAGEMENT_DETAILS,
    UPDATED_UNIT,
    ADD_RELATIONSHIPS
} from '../constants/ActionTypes';

import axios from 'axios';
import moment from 'moment';
import { loadEngagements, sendEngagementsBrowse } from './engagementsActions';

export function loadItemDetails(matchedItemId, requestedItemId, engagement) {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        dispatch({ type: RESET_SUCCESS });
        dispatch({ type: RESET_ERROR });
        dispatch({ type: REQUEST_STARTED });

        axios.get(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}?include=pricingOptions,matchedSupplier,quoteRequestEngagements,quoteRequestEngagements.createdBy,quoteRequestEngagements.engagementDetails,quoteRequestEngagements.matchedItem&fields[pricing-options]=title,value,standby_value&fields[engagement]=status,engagement_text,po_value`)
        .then((response) => {
            let pricingOptions = [];
            let supplier = [];
            let matchedItemTitle = '';
            response = response.data;
            if (engagement) {
                pricingOptions = response.included.filter((i) => {
                    if (i.type === 'pricing-options') {
                        i.attributes.selected = i.attributes.selected ? i.attributes.selected : false;
                        return i;
                    }
                }).map(function(pricingOption) {
                    let pricingOptionUpdated = {};
                    let engagementDetail = engagement.engagementDetails.filter(i => pricingOption.id === i.pricingOption.id);
                    pricingOptionUpdated = engagementDetail.length ?
                        { ...pricingOption,
                            attributes: { ...pricingOption.attributes,
                                'value': engagementDetail[0].attributes.rate_value,
                                'unit': engagementDetail[0].attributes.unit,
                                'oldUnit': engagementDetail[0].attributes.unit,
                                'selected': true
                            },
                            'relationships': {
                                'engagement-details': {
                                    'data': {
                                        'type': 'engagement-details',
                                        'id': engagementDetail[0].id
                                    }
                                }
                            }
                        } :
                        { ...pricingOption,
                            attributes: { ...pricingOption.attributes,
                                'oldUnit': pricingOption.attributes.unit || '',
                                'selected': false
                            }
                        };
                    return pricingOptionUpdated;
                });
            } else {
                supplier = response.included.filter((i) => {
                    if (i.type === 'supplier') {
                        return i;
                    }
                });
                matchedItemTitle = response.data.attributes.title;
                pricingOptions = response.included.filter((i) => {
                    if (i.type === 'pricing-options') {
                        i.attributes.selected = i.attributes.selected ? i.attributes.selected : false;
                        return i;
                    }
                });
            }

            dispatch(updateCurrentEngagement(matchedItemId, requestedItemId, engagement, supplier, matchedItemTitle));
            dispatch(receivePricingOptions(pricingOptions));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response.data });
        });
    };
}

export function loadItemDetailsPanel(panelId, itemId, regionId) {
    return (dispatch) => {
        dispatch({ type: RESET_SUCCESS });
        dispatch({ type: RESET_ERROR });
        dispatch({ type: REQUEST_STARTED });
        axios.get(`/browse-panels/${panelId}/items/${itemId}?include=standardRates,supplier&filters[regionId]=${regionId}&fields[pricing-options]=title,value,standby_value`)
        .then((response) => {
            let pricingOptions = [];
            let supplier = [];
            let matchedItemTitle = '';
            response = response.data;
            supplier = response.included.filter((i) => {
                if (i.type === 'supplier') {
                    return i;
                }
            });
            matchedItemTitle = response.data.attributes.title;
            pricingOptions = response.included.filter((i) => {
                if (i.type === 'pricing-options') {
                    i.attributes.selected = i.attributes.selected ? i.attributes.selected : false;
                    return i;
                }
            });

            dispatch(updateCurrentEngagementPanel(supplier, matchedItemTitle));
            dispatch(receivePricingOptions(pricingOptions));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response.data });
        });
    };
}

export function receivePricingOptions(pricingOptions) {
    return {
        type: PRICING_OPTIONS_RECEIVED,
        pricingOptions: pricingOptions
    };
}

export function updateCurrentEngagementPanel(supplier, matchedItemTitle) {
    window.console.log(supplier);
    const supplierDetails = supplier.length ? supplier[0] : {};
    let currentEngagement = {
        'type': 'engagements',
        'id': null,
        'attributes': {
            'status': 1,
            'purchase-order': null,
            'plan-start-date': null,
            'engagement_text': null
        },
        'relationships': {
            'supplier': supplierDetails,
            matchedItemTitle
        }
    };
    return { type: RECEIVE_NEW_ENGAGEMENT, currentEngagement };
}

export function updateCurrentEngagement(matchedItemId, requestedItemId, engagement, supplier, matchedItemTitle) {
    window.console.log(supplier);
    const supplierDetails = supplier.length ? supplier[0] : {};
    const engagementTitle = engagement ? `${engagement.supplier.attributes.title} - ${engagement.matchedItem.attributes.title}` : null;
    let currentEngagement = {
        'type': 'engagements',
        'id': engagement ? engagement.id : null,
        'attributes': engagement ? {
            'title': engagementTitle ? engagementTitle.substr(engagementTitle.lastIndexOf('>')+1) : engagementTitle,
            'status': 1,
            'purchase-order': engagement.attributes.po_number,
            'plan-start-date': engagement.attributes.pre_start_date,
            'engagement_text': engagement.attributes.engagement_text
        } : {
            'status': 1,
            'purchase-order': null,
            'plan-start-date': null,
            'engagement_text': null
        },
        'relationships': {
            'matched-items': {
                'data': {
                    'type': 'matched-items',
                    'id': matchedItemId
                }
            },
            'requested-items': {
                'data': {
                    'type': 'requested-items',
                    'id': requestedItemId
                }
            },
            'supplier': supplierDetails,
            matchedItemTitle
        }
    };
    return { type: RECEIVE_NEW_ENGAGEMENT, currentEngagement };
}

export function handlePOChange(value) {
    return {
        type: UPDATE_PURCHASE_ORDER,
        purchaseOrder: value
    };
}

export function handePlanDateChange(changedDate) {
    let updatedDate = moment(changedDate).format('YYYY-MM-DD');
    return {
        type: UPDATE_PLAN_DATE,
        'plan-start-date': updatedDate
    };
}

export function handleEngagementTextChange(value) {
    return {
        type: UPDATE_ENGAGEMENT_TEXT,
        engagement_text: value
    };
}

export function handleTextChange(pricingOption, value) {
    return {
        type: UPDATE_TEXT,
        id: pricingOption.id,
        unit: value
    };
}

export function handlePricingOptionSelection(pricingOption, value) {
    return {
        type: UPDATE_PRICING_OPTION,
        id: pricingOption.id,
        selected: value
    };
}

function convertToCurrency(value) {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function isValidEngagement(dispatch, currentEngagement, pricingOptions, engagementLimit) {
    dispatch({ type: RESET_ERROR });
    let pricing = pricingOptions && pricingOptions.filter(pricingOption => pricingOption.attributes.selected);
    if (pricingOptions && !pricing.length) {
        dispatch({
            type: VALIDATION_ERROR,
            message: 'Please provide values for "Estimated Unit(s)"'
        });
        return false;
    }
    if (engagementLimit) {
        let totalPrice = pricing.map(function(price) {
            return +price.attributes.value * +price.attributes.unit;
        }).reduce(function(total, price) {
            return total + price;
        }, 0);
        if (totalPrice > engagementLimit) {
            dispatch({
                type: VALIDATION_ERROR,
                message: `This value exceeds the approved limit for spot engagements. Please create a Quote Request to facilitate engagements greater than $${convertToCurrency(engagementLimit)} in value.`
            });
            return false;
        }
    }
    if (currentEngagement && !currentEngagement.attributes['purchase-order']) {
        dispatch({
            type: VALIDATION_ERROR,
            message: 'Please provide a value for "Work Order"'
        });
        return false;
    }
    if (currentEngagement && !moment(currentEngagement.attributes['plan-start-date'], 'YYYY-MM-DD', true).isValid()) {
        dispatch({
            type: VALIDATION_ERROR,
            message: 'Please provide a valid date for "Planned Start Date"'
        });
        return false;
    }
    return true;
}

export function createEngagement() {
    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            requestedItemId = currentEngagement.relationships['requested-items'].data.id,
            matchedItemId = currentEngagement.relationships['matched-items'].data.id,
            pricingOptions = getState().itemDetailsReducer.pricingOptions,
            quoteId = getState().itemsReducer.quoteId;

        if (!isValidEngagement(dispatch, currentEngagement, pricingOptions)) {
            return;
        }

        dispatch({ type: RESET_SUCCESS });
        dispatch({ type: RESET_ERROR });
        dispatch({ type: REQUEST_STARTED });

        axios.post(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements`, { data: currentEngagement })
        .then((response) => {
            response = response.data;
            window.console.log('engagement created: ', response.data.id);
            dispatch(createEngagementDetails(pricingOptions, requestedItemId, matchedItemId, response.data.id, quoteId));
            dispatch({
                type: UPDATE_SUGGESTION,
                value: ''
            });
            dispatch({ type: REQUEST_COMPLETED });

        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response.data });
        });
    };
}

export function createEngagementDetails(pricingOptions, requestedItemId, matchedItemId, engagementId, quoteId) {
    const engagementDetails = pricingOptions.filter(function(pricingOption) {
        return (pricingOption.attributes.selected) ? true: false;
    }).map(function(pricingOption) {
        let engagementDetail = {
            'type': 'engagement-details',
            'attributes': {
                'rate_value': pricingOption.attributes.value,
                'unit': pricingOption.attributes.unit
            },
            'relationships': {
                'engagements': {
                    'data': {
                        'type': 'engagements',
                        'id': engagementId
                    }
                },
                'pricing-options': {
                    'data': {
                        'type': 'pricing-options',
                        'id': pricingOption.id
                    }
                }
            }
        };
        return engagementDetail;
    });

    return (dispatch, getState) => {
        let numEngagementDetails = 0;
        engagementDetails.forEach(function(engagementDetail) {
            dispatch({ type: REQUEST_STARTED });
            axios.post(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/engagement-details`, { data: engagementDetail })
            .then((response) => {
                window.console.log(response);
                numEngagementDetails += 1;
                if (numEngagementDetails === engagementDetails.length) {
                    const quoteId = getState().itemsReducer.quoteId;
                    dispatch({ type: DISPLAY_SUCCESS, message: `Engagement #${engagementId} created` });
                    dispatch(resetItemDetails());
                    dispatch(loadEngagements(quoteId));
                }
                dispatch({ type: REQUEST_COMPLETED });
            }).catch((error) => {
                dispatch({ type: REQUEST_COMPLETED });
                dispatch({ type: REQUEST_ERROR, error: error.response.data });
            });
        });
    };
}

export function createEngagementPanel() {
    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            panelId = getState().itemsReducer.panelId,
            itemId = getState().itemsReducer.itemId,
            engagementLimit = getState().itemsReducer.engagementLimit,
            pricingOptions = getState().itemDetailsReducer.pricingOptions;

        if (!isValidEngagement(dispatch, currentEngagement, pricingOptions, engagementLimit)) {
            return;
        }

        dispatch({ type: RESET_SUCCESS });
        dispatch({ type: RESET_ERROR });
        dispatch({ type: REQUEST_STARTED });

        axios.post(`/browse-panels/${panelId}/items/${itemId}/engagements`, { data: currentEngagement })
        .then((response) => {
            let engagementId = response.data.data.id;
            window.console.log('browse engagement created: ', response.data.data.id);
            dispatch(createEngagementDetailsPanel(pricingOptions, panelId, itemId, engagementId));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response.data });
        });
    };
}

export function createEngagementDetailsPanel(pricingOptions, panelId, itemId, engagementId) {
    const engagementDetails = pricingOptions.filter(function(pricingOption) {
        return (pricingOption.attributes.selected) ? true: false;
    }).map(function(pricingOption) {
        let engagementDetail = {
            'type': 'engagement-details',
            'attributes': {
                'rate_value': pricingOption.attributes.value,
                'unit': pricingOption.attributes.unit
            },
            'relationships': {
                'engagements': {
                    'data': {
                        'type': 'engagements',
                        'id': engagementId
                    }
                },
                'pricing-options': {
                    'data': {
                        'type': 'pricing-options',
                        'id': pricingOption.id
                    }
                }
            }
        };
        return engagementDetail;
    });

    return (dispatch) => {
        let numEngagementDetails = 0;
        engagementDetails.forEach(function(engagementDetail) {
            dispatch({ type: REQUEST_STARTED });
            axios.post(`/browse-panels/${panelId}/items/${itemId}/engagements/${engagementId}/engagement-details`, { data: engagementDetail })
            .then((response) => {
                window.console.log(response);
                numEngagementDetails += 1;
                if (numEngagementDetails === engagementDetails.length) {
                    dispatch(resetItemDetails());
                    dispatch(sendEngagementsBrowse(engagementId));
                }
                dispatch({ type: REQUEST_COMPLETED });
            }).catch((error) => {
                dispatch({ type: REQUEST_COMPLETED });
                dispatch({ type: REQUEST_ERROR, error: error.response.data });
            });
        });
    };
}

export function handleEngagementUpdate() {
    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            requestedItemId = currentEngagement.relationships['requested-items'].data.id,
            matchedItemId = currentEngagement.relationships['matched-items'].data.id,
            engagementId = currentEngagement.id,
            quoteId = getState().itemsReducer.quoteId;

        if (!isValidEngagement(dispatch, currentEngagement, null)) {
            return;
        }

        dispatch({ type: REQUEST_STARTED });

        axios.patch(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}`, { data: currentEngagement })
        .then((response) => {
            dispatch ({
                type: UPDATED_ENGAGEMENT,
                oldPOVal: null,
                oldPODate: null,
                oldEngagementText: null,
                'purchase-order': currentEngagement.attributes['purchase-order'],
                'plan-start-date': currentEngagement.attributes['plan-start-date'],
                'engagement_text': currentEngagement.attributes['engagement_text'],
                engagementId
            });
            window.console.log('engagement updated: ', response);
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({
                type: REQUEST_ERROR,
                error: error.response && error.response.data || error
            });
        });
    };
}

export function handleEngagementDetailCreate(pricingOption, unit) {
    const valueChanged = +pricingOption.attributes.oldUnit !== +unit;

    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            engagementId = currentEngagement.id;

        if (engagementId && valueChanged) {
            const requestedItemId = currentEngagement.relationships['requested-items'].data.id,
                matchedItemId = currentEngagement.relationships['matched-items'].data.id,
                pricingOptions = getState().itemDetailsReducer.pricingOptions,
                quoteId = getState().itemsReducer.quoteId;


            if (!isValidEngagement(dispatch, null, pricingOptions)) {
                return;
            }

            let engagementDetail = {
                'type': 'engagement-details',
                'attributes': {
                    'rate_value': pricingOption.attributes.value,
                    'unit': pricingOption.attributes.unit
                },
                'relationships': {
                    'engagements': {
                        'data': {
                            'type': 'engagements',
                            'id': engagementId
                        }
                    },
                    'pricing-options': {
                        'data': {
                            'type': 'pricing-options',
                            'id': pricingOption.id
                        }
                    }
                }
            };

            dispatch({ type: REQUEST_STARTED });
            axios.post(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/engagement-details`, { data: engagementDetail })
            .then((response) => {
                engagementDetail = {
                    'type': 'engagement-details',
                    'id':response.data.data.id,
                    'attributes': {
                        'pricing_option': pricingOption.attributes.title,
                        'rate_value': pricingOption.attributes.value,
                        'unit': pricingOption.attributes.unit
                    },
                    'pricingOption': pricingOption
                };
                dispatch ({
                    type: ADD_ENGAGEMENT_DETAILS,
                    engagementDetail,
                    engagementId
                });
                dispatch({
                    type: ADD_RELATIONSHIPS,
                    id: pricingOption.id,
                    'engagement-details':{
                        'data': {
                            'type': 'engagement-details',
                            'id': engagementDetail.id
                        }
                    }
                });
                dispatch({
                    type: UPDATED_UNIT,
                    id: pricingOption.id,
                    oldUnit: unit
                });
                dispatch({ type: REQUEST_COMPLETED });
            }).catch((error) => {
                dispatch({ type: REQUEST_COMPLETED });
                dispatch({ type: REQUEST_ERROR, error: error.response.data });
            });
        }
    };
}

export function handleEngagementDetailUpdate(pricingOption, unit) {
    const valueChanged = +pricingOption.attributes.oldUnit !== +unit;

    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            engagementId = currentEngagement.id;

        if (engagementId && valueChanged) {
            const requestedItemId = currentEngagement.relationships['requested-items'].data.id,
                matchedItemId = currentEngagement.relationships['matched-items'].data.id,
                engagementDetailId = pricingOption.relationships['engagement-details'].data.id,
                pricingOptions = getState().itemDetailsReducer.pricingOptions,
                quoteId = getState().itemsReducer.quoteId;


            if (!isValidEngagement(dispatch, null, pricingOptions)) {
                return;
            }

            unit = (unit === '') ? 0 : unit;

            const engagementDetails = {
                'type': 'engagement-details',
                'id': engagementDetailId,
                'attributes': {
                    'unit': unit
                }
            };

            dispatch({ type: REQUEST_STARTED });

            axios.patch(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/engagement-details/${engagementDetailId}`, { data: engagementDetails })
            .then((response) => {
                dispatch ({
                    type: UPDATED_ENGAGEMENT_DETAILS,
                    unit,
                    id: engagementDetailId,
                    engagementId
                });
                dispatch({
                    type: UPDATED_UNIT,
                    id: pricingOption.id,
                    oldUnit: unit
                });
                window.console.log('engagement detail updated: ', response);
                dispatch({ type: REQUEST_COMPLETED });
            }).catch((error) => {
                dispatch({ type: REQUEST_COMPLETED });
                dispatch({ type: REQUEST_ERROR, error: error.response.data });
            });
            window.console.log(' requestedItemId: ', requestedItemId, ' matchedItemId: ', matchedItemId, ' pricingOptions: ', pricingOptions, ' engagementDetailId: ', engagementDetailId);
        }
    };
}

export function resetItemDetails() {
    return (dispatch) => {
        dispatch({ type: RESET_ITEM_DETAILS });
    };
}
