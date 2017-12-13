import {
    RECEIVE_ENGAGEMENTS,
    RESET_CURRENT_ENGAGEMENT,
    RESET_PRICING_OPTIONS,
    ENGAGEMENT_DELETED,
    ENGAGEMENT_CANCELLED,
    TOGGLE_ENGAGEMENT_TEXT,
    UPDATE_NOTIFY_ALL,
    ACTIVATE_CANCEL_ENGAGEMENT,
    UPDATE_TOTALS
} from '../constants/ActionTypes';

import {
    KEY_PENDING,
    KEY_SENT,
    KEY_CANCELLED,
    KEY_REJECTED
} from '../constants/EngagementTypes';

import axios from 'axios';
import { displaySuccess, requestStarted, requestCompleted, requestError } from './uiActions';

export function loadEngagements(quoteId) {
    return (dispatch) => {
        dispatch(requestStarted());
        axios.get(`/searcher-quote-requests/${quoteId}/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem,matchedItem.requestedItem.category,item.category&fields[engagements]=status,engagement_text,item_id,po_number,po_file_id,po_value,auto_decline_flag,pre_start_date,created_at,updated_at,can_action&fields[categories]=title`)
        .then((response) => {
            dispatch(loadEngagementsSuccess(response.data));
            dispatch(updateTotals());
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}

function getSupplier(included, matchedItemId) {
    let supplier = included.filter(function(i) {
        return i.id === matchedItemId;
    }).reduce(
        (a, b) => b.relationships.matchedSupplier.data, {}
    ).reduce((a, b) => b, {});

    let supplierDetails = included.filter(i =>
        i.type === 'supplier' && i.id === supplier.id
    ).reduce(a => a);

    return supplierDetails;
}

function getCategory(included, matchedItemId) {
    let matchedItem = included.filter(function(i) {
        return i.id === matchedItemId;
    }).reduce((a, b) => b, {});

    let requestedItem = included.filter(function(i) {
        return i.id === matchedItem.relationships.requestedItem.data.id;
    }).reduce((a, b) => b, {});

    let category = included.filter(function(i) {
        return i.id === requestedItem.relationships.category.data.id;
    }).reduce((a, b) => b, {});

    let categoryDetails = included.filter(i =>
        i.type === 'category' && i.id === category.id
    ).reduce(a => a);
    return categoryDetails;
}

function engagementMapper(engagements, engagementArray) {
    const engagementMapped = engagementArray.map((engagement) => {
        let matchedItemId = engagement.relationships.matchedItem.data.id;
        // TODO: user information is no longer returned from the API, please remove any user references
        let userId = engagement.relationships.staff && engagement.relationships.staff.data.id || engagement.relationships.user && engagement.relationships.user.data.id;
        let engagementDetailIds = engagement.relationships.engagementDetails.data.length ?
            engagement.relationships.engagementDetails.data.map(engagementDetail => engagementDetail.id) : null;
        return {
            'type': 'engagements',
            'id': engagement.id,
            'attributes': engagement.attributes,
            'engagementDetails': engagements.included
                .filter(i => (i.type === 'engagement-details' && engagementDetailIds.indexOf(i.id) > -1))
                .map((item) => {
                    let pricingOption = engagements.included.filter(
                        i => (i.type === 'pricing-option' && i.id === item.relationships.pricingOption.data.id)
                    ).reduce(a => a);
                    return {
                        type: item.type,
                        id: item.id,
                        attributes: item.attributes,
                        pricingOption: pricingOption
                    };
                }),
            'matchedItem': engagements.included
                .filter(i => (i.type === 'matched-item' && i.id === matchedItemId))
                .map((item) => {
                    return {
                        type: item.type,
                        id: item.id,
                        attributes: item.attributes
                    };
                }).reduce(a => a),
            'requestedItem': engagements.included
                .filter(i => (i.type === 'matched-item' && i.id === matchedItemId))
                .map((item) => {
                    return item.relationships.requestedItem.data;
                }).reduce(a => a),
            'createdBy': engagements.included
                .filter(i => ((i.type === 'staff' || i.type === 'user') && i.id === userId))
                .map((user) => {
                    return user.attributes.first_name + ' ' + user.attributes.last_name;
                }).reduce(a => a),
            'supplier': getSupplier(engagements.included, matchedItemId),
            'category': getCategory(engagements.included, matchedItemId)
        };
    });

    return engagementMapped;
}

export function loadEngagementsSuccess(engagements) {
    const pendingEngagements = engagementMapper(engagements, engagements.data.filter(i => i.attributes.status === KEY_PENDING));
    const sentEngagements = engagementMapper(engagements, engagements.data.filter(i => i.attributes.status === KEY_SENT || i.attributes.status === KEY_REJECTED || i.attributes.status === KEY_CANCELLED));
    return { type: RECEIVE_ENGAGEMENTS, pendingEngagements, sentEngagements };
}

export function updateTotals() {
    return { type: UPDATE_TOTALS };
}

export function deleteEngagement(requestedItemId, matchedItemId, engagementId) {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        const currentEngagementId = getState().itemDetailsReducer.currentEngagement.id;
        let engagement = {
            data: [{
                type: 'engagements',
                id: engagementId,
                relationships: {}
            }]
        };
        dispatch(requestStarted());
        axios.delete(`searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}`, { data:engagement })
        .then(() => {
            if (currentEngagementId === engagementId) {
                dispatch({
                    type: RESET_CURRENT_ENGAGEMENT,
                    currentEngagement: {}
                });
                dispatch({
                    type: RESET_PRICING_OPTIONS,
                    pricingOptions: []
                });
            }
            dispatch({
                type: ENGAGEMENT_DELETED,
                id: engagementId
            });
            dispatch(updateTotals());
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}

export function cancelEngagement(requestedItemId, matchedItemId, engagementId) {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        let engagement = {
            data: [{
                type: 'engagements',
                id: engagementId,
                relationships: {}
            }]
        };
        dispatch(requestStarted());
        axios.post(`searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/cancel`, { data:engagement })
        .then(() => {
            dispatch({
                type: ENGAGEMENT_CANCELLED,
                id: engagementId
            });
            dispatch(updateTotals());
            dispatch(requestCompleted());
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}

export function sendEngagements() {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        let sendToAll = {
            data: {
                'notifyUnsuccessful': getState().engagementsReducer.notifyAll
            }
        };
        dispatch(requestStarted());
        axios.post(`searcher-quote-requests/${quoteId}/engagements`, sendToAll)
        .then(() => {
            dispatch(loadEngagements(quoteId));
            dispatch(requestCompleted());
            dispatch(displaySuccess(`Engagement(s) sent successfully`));
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
        dispatch({ type: UPDATE_NOTIFY_ALL, notifyAll: false });
    };
}

export function toggleEngagementText(engagementId) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ENGAGEMENT_TEXT,
            id: engagementId
        });
    };
}

export function updateNotifyAll(notifyAll) {
    return (dispatch) => {
        dispatch({ type: UPDATE_NOTIFY_ALL, notifyAll });
    };
}

export function activateCancelEngagement(engagement) {
    return (dispatch) => {
        dispatch({ type: ACTIVATE_CANCEL_ENGAGEMENT, engagement });
    };
}

export function sendEngagementsBrowse(engagementId) {
    return (dispatch, getState) => {
        const panelId = getState().itemsReducer.panelId;
        const itemId = getState().itemsReducer.itemId;
        dispatch(requestStarted());
        axios.post(`browse-panels/${panelId}/items/${itemId}/engagements/${engagementId}`)
        .then(() => {
            dispatch(requestCompleted());
            dispatch(displaySuccess(`Engagement #${engagementId} created and sent successfully`));
        }).catch((error) => {
            dispatch(requestCompleted());
            dispatch(requestError(error));
        });
    };
}
