import {
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
import { isValidEngagement, displaySuccess, resetSuccess, resetError, requestStarted, requestCompleted, requestError } from './uiActions';

export function receivePricingOptions(pricingOptions) {
    return {
        type: PRICING_OPTIONS_RECEIVED,
        pricingOptions: pricingOptions
    };
}

export function updateCurrentEngagementPanel(supplier, matchedItemTitle) {
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

export function resetItemDetails() {
    return (dispatch) => {
        dispatch({ type: RESET_ITEM_DETAILS });
    };
}

export function loadItemDetails(matchedItemId, requestedItemId, engagement) {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        dispatch(resetSuccess());
        dispatch(resetError());
        dispatch(requestStarted());

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
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}

export function loadItemDetailsPanel(panelId, itemId, regionId) {
    return (dispatch) => {
        dispatch(resetSuccess());
        dispatch(resetError());
        dispatch(requestStarted());
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
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
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

        dispatch(resetSuccess());
        dispatch(resetError());
        dispatch(requestStarted());

        axios.post(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements`, { data: currentEngagement })
        .then((response) => {
            response = response.data;
            window.console.log('engagement created: ', response.data.id);
            dispatch(createEngagementDetails(pricingOptions, requestedItemId, matchedItemId, response.data.id, quoteId));
            dispatch({
                type: UPDATE_SUGGESTION,
                value: ''
            });
            dispatch(requestCompleted());

        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
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
            dispatch(requestStarted());
            axios.post(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/engagement-details`, { data: engagementDetail })
            .then((response) => {
                window.console.log(response);
                numEngagementDetails += 1;
                if (numEngagementDetails === engagementDetails.length) {
                    const quoteId = getState().itemsReducer.quoteId;
                    dispatch(displaySuccess(`Engagement #${engagementId} created`));
                    dispatch(resetItemDetails());
                    dispatch(loadEngagements(quoteId));
                }
                dispatch(requestCompleted());
            }).catch((error) => {
                dispatch(requestCompleted());
                dispatch(requestError(error));
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

        dispatch(resetSuccess());
        dispatch(resetError());
        dispatch(requestStarted());

        axios.post(`/browse-panels/${panelId}/items/${itemId}/engagements`, { data: currentEngagement })
        .then((response) => {
            let engagementId = response.data.data.id;
            window.console.log('browse engagement created: ', response.data.data.id);
            dispatch(createEngagementDetailsPanel(pricingOptions, panelId, itemId, engagementId));
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
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
            dispatch(requestStarted());
            axios.post(`/browse-panels/${panelId}/items/${itemId}/engagements/${engagementId}/engagement-details`, { data: engagementDetail })
            .then((response) => {
                window.console.log(response);
                numEngagementDetails += 1;
                if (numEngagementDetails === engagementDetails.length) {
                    dispatch(resetItemDetails());
                    dispatch(sendEngagementsBrowse(engagementId));
                }
                dispatch(requestCompleted());
            }).catch((error) => {
                dispatch(requestCompleted());
                dispatch(requestError(error));
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

        dispatch(requestStarted());

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
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
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

            dispatch(requestStarted());
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
                dispatch(requestCompleted());
            }).catch((error) => {
                dispatch(requestCompleted());
                dispatch(requestError(error));
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

            dispatch(requestStarted());

            axios.patch(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/engagement-details/${engagementDetailId}`, { data: engagementDetails })
            .then(() => {
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
                dispatch(requestCompleted());
            }).catch((error) => {
                dispatch(requestCompleted());
                dispatch(requestError(error));
            });
        }
    };
}
