import {
    RECEIVE_ENGAGEMENTS,
    RESET_CURRENT_ENGAGEMENT,
    RESET_PRICING_OPTIONS,
    ENGAGEMENT_DELETED,
    ENGAGEMENT_CANCELLED,
    TOGGLE_ENGAGEMENT_TEXT,
    UPDATE_NOTIFY_ALL,
    ACTIVATE_CANCEL_ENGAGEMENT
} from '../constants/ActionTypes';

import axios from 'axios';
import { displaySuccess, requestStarted, requestCompleted, requestError } from './uiActions';

export function loadEngagements(quoteId) {
    return (dispatch) => {
        dispatch(requestStarted());
        axios.get(`/searcher-quote-requests/${quoteId}/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem,item.category&fields[engagements]=status,engagement_text,item_id,po_number,po_file_id,po_value,auto_decline_flag,pre_start_date,created_at,updated_at,can_cancel&fields[categories]=title`)
        .then((response) => {
            dispatch(loadEngagementsSuccess(response.data));
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

function getCategory(included, categoryId) {
    let category = included.filter(function(i) {
        return i.id === categoryId;
    }).reduce((a, b) => b, {});

    let categoryDetails = included.filter(i =>
        i.type === 'category' && i.id === category.relationships.category.data.id
    ).reduce(a => a);
    return categoryDetails;
}

export function loadEngagementsSuccess(engagements) {
    const pendingEngagements = engagements.data
        .filter(i => i.attributes.status === 1)
        .map((engagement) => {
            let itemId = engagement.relationships.item.data.id;
            let matchedItemId = engagement.relationships.matchedItem.data.id;
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
                'category': getCategory(engagements.included, itemId)
            };
        });

    const sentEngagements = engagements.data.filter(i => i.attributes.status === 5 || i.attributes.status === 2)
        .map((engagement) => {
            let itemId = engagement.relationships.item.data.id;
            let matchedItemId = engagement.relationships.matchedItem.data.id;
            let engagementDetailIds = engagement.relationships.engagementDetails.data.length ?
                engagement.relationships.engagementDetails.data.map(engagementDetail => engagementDetail.id) : null;
            let userId = engagement.relationships.staff && engagement.relationships.staff.data.id || engagement.relationships.user && engagement.relationships.user.data.id;
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
                'category': getCategory(engagements.included, itemId)
            };
        });

    return { type: RECEIVE_ENGAGEMENTS, pendingEngagements, sentEngagements };
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
