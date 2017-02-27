import {
    UPDATE_SUGGESTION,
    LOAD_ITEM_DETAILS_SUCCESS,
    LOAD_ITEM_DETAILS_ERROR,
    RECEIVE_NEW_ENGAGEMENT,
    RESET_ITEM_DETAILS,
    PRICING_OPTIONS_RECEIVED,
    UPDATE_TEXT,
    UPDATE_PRICING_OPTION,
    UPDATE_PURCHASE_ORDER,
    UPDATE_PLAN_DATE,
    UPDATED_ENGAGEMENT,
    UPDATED_ENGAGEMENT_DETAILS,
    UPDATED_UNIT
} from '../constants/ActionTypes';

import { setEndpointPath, createEntity, readEndpoint, updateEntity } from 'redux-json-api';
import axios from 'axios';
import moment from 'moment';
import { loadEngagements } from './engagementsActions';

export function loadItemDetails(matchedItemId, requestedItemId, engagement) {
    const endPoint = `${matchedItemId}?include=pricingOptions,matchedSupplier,quoteRequestEngagements,quoteRequestEngagements.createdBy,quoteRequestEngagements.engagementDetails,quoteRequestEngagements.matchedItem&fields[pricing-options]=title,value,standby_value&fields[engagement]=status,engagement_text,po_value`;

    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;

        dispatch(setEndpointPath(`/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items`));
        dispatch(readEndpoint(endPoint))
        .then((response) => {
            let pricingOptions = [];
            let supplier = [];
            let matchedItemTitle = '';
            if (engagement) {
                pricingOptions = response.included.filter((i) => {
                    if (i.type === 'pricing-options') {
                        i.attributes.selected = i.attributes.selected ? i.attributes.selected : false;
                        return i;
                    }
                }).map(function(pricingOption) {
                    let pricingOptionUpdated = { ...pricingOption,
                        attributes: { ...pricingOption.attributes,
                            'value': engagement.engagementDetails[0].attributes.rate_value,
                            'unit': engagement.engagementDetails[0].attributes.unit,
                            'oldUnit': engagement.engagementDetails[0].attributes.unit,
                            'selected': true
                        },
                        'relationships': {
                            'engagement-details': {
                                'data': {
                                    'type': 'engagement-details',
                                    'id': engagement.engagementDetails[0].id
                                }
                            }
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
        }).catch((error) => {
            dispatch(loadItemDetailsError(error));
        });
    };
}

export function loadItemDetailsPanel(panelId, itemId) {
    return (dispatch) => {
        axios.get(`/browse-panels/${panelId}/items/${itemId}?include=supplier,standardRates`)
        .then((response) => {
            let pricingOptions = [];
            let supplier = [];
            let matchedItemTitle = '';
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

            window.console.log(pricingOptions);
            window.console.log(supplier);
            window.console.log(matchedItemTitle);

            dispatch(updateCurrentEngagementPanel(supplier, matchedItemTitle));
            dispatch(receivePricingOptions(pricingOptions));
        }).catch((error) => {
            dispatch(loadItemDetailsError(error));
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
            'plan-start-date': null
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
            'plan-start-date': engagement.attributes.pre_start_date
        } : {
            'status': 1,
            'purchase-order': null,
            'plan-start-date': null
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

export function loadItemDetailsSuccess(error) {
    return { type: LOAD_ITEM_DETAILS_SUCCESS, error };
}

export function loadItemDetailsError(error) {
    return { type: LOAD_ITEM_DETAILS_ERROR, error };
}

export function handlePOChange(value) {
    return {
        type: UPDATE_PURCHASE_ORDER,
        purchaseOrder: value
    };
}

export function handePlanDateChange(changedDate) {
    let updatedDate = moment(changedDate).format('YYYY-MM-DD');
    window.console.log(updatedDate);
    // const updatedDate = changedDate.getFullYear() + '-' + (changedDate.getMonth() + 1) + '-' + changedDate.getDate();
    return {
        type: UPDATE_PLAN_DATE,
        'plan-start-date': updatedDate
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

export function createEngagement() {
    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            requestedItemId = currentEngagement.relationships['requested-items'].data.id,
            matchedItemId = currentEngagement.relationships['matched-items'].data.id,
            pricingOptions = getState().itemDetailsReducer.pricingOptions,
            quoteId = getState().itemsReducer.quoteId,
            newPath = `/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}`;

        dispatch(setEndpointPath(newPath));

        dispatch(createEntity(currentEngagement))
        .then((response) => {
            window.console.log('engagement created: ', response.data.id);
            dispatch(createEngagementDetails(pricingOptions, requestedItemId, matchedItemId, response.data.id, quoteId));
            dispatch({
                type: UPDATE_SUGGESTION,
                value: ''
            });

        }).catch((error) => {
            window.console.log(error);
        });
    };
}

export function createEngagementDetails(pricingOptions, requestedItemId, matchedItemId, engagementId, quoteId) {
    const newPath = `/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}`;

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
        dispatch(setEndpointPath(newPath));

        engagementDetails.forEach(function(engagementDetail) {
            dispatch(createEntity(engagementDetail))
            .then((response) => {
                window.console.log(response);
                const quoteId = getState().itemsReducer.quoteId;
                dispatch(loadEngagements(quoteId));
                dispatch({
                    type: RESET_ITEM_DETAILS
                });

            }).catch((error) => {
                window.console.log(error);
            });
        });
    };
}

export function handleEngagementUpdate() {
    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            requestedItemId = currentEngagement.relationships['requested-items'].data.id,
            matchedItemId = currentEngagement.relationships['matched-items'].data.id,
            quoteId = getState().itemsReducer.quoteId,
            newPath = `/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}`;

        dispatch(setEndpointPath(newPath));

        dispatch(updateEntity(currentEngagement))
        .then((response) => {
            dispatch ({
                type: UPDATED_ENGAGEMENT,
                oldPOVal: null
            });
            window.console.log('engagement updated: ', response);
        }).catch((error) => {
            window.console.log(error);
        });
    };
}

export function handleEngagementDetailUpdate(pricingOption, value) {
    const valueChanged = pricingOption.attributes.oldUnit !== parseInt(value);

    return (dispatch, getState) => {
        const currentEngagement = getState().itemDetailsReducer.currentEngagement,
            engagementId = currentEngagement.id;

        if (engagementId && valueChanged) {
            const requestedItemId = currentEngagement.relationships['requested-items'].data.id,
                matchedItemId = currentEngagement.relationships['matched-items'].data.id,
                engagementDetailId = pricingOption.relationships['engagement-details'].data.id,
                pricingOptions = getState().itemDetailsReducer.pricingOptions,
                quoteId = getState().itemsReducer.quoteId,
                newPath = `/searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}`;

            const engagementDetails = {
                'type': 'engagement-details',
                'id': engagementDetailId,
                'attributes': {
                    'unit': value
                }
            };

            dispatch(setEndpointPath(newPath));

            dispatch(updateEntity(engagementDetails))
            .then((response) => {
                dispatch ({
                    type: UPDATED_ENGAGEMENT_DETAILS,
                    unit: value,
                    id: engagementDetailId,
                    engagementId
                });
                dispatch({
                    type: UPDATED_UNIT,
                    id: pricingOption.id,
                    oldUnit: value
                });
                window.console.log('engagement updated: ', response);
            }).catch((error) => {
                window.console.log(error);
            });
            window.console.log(' requestedItemId: ', requestedItemId, ' matchedItemId: ', matchedItemId, ' pricingOptions: ', pricingOptions, ' engagementDetailId: ', engagementDetailId);
        }
    };
}
