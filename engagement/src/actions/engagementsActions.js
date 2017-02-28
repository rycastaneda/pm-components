import {
    RECEIVE_ENGAGEMENTS,
    RESET_CURRENT_ENGAGEMENT,
    RESET_PRICING_OPTIONS,
    ENGAGEMENT_DELETED
} from '../constants/ActionTypes';

import axios from 'axios';

export function loadEngagements(quoteId) {
    return (dispatch) => {
        axios.get(`/searcher-quote-requests/${quoteId}/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem`)
        .then((response) => {
            dispatch(loadEngagementsSuccess(response.data));
        }).catch((error) => {
            window.console.log(error);
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

export function loadEngagementsSuccess(engagements) {
    const pendingEngagements = engagements.data
        .filter(i => i.attributes.status === 1)
        .map((engagement) => {
            let matchedItemId = engagement.relationships.matchedItem.data.id;
            let engagementDetailId = engagement.relationships.engagementDetails.data.length ? engagement.relationships.engagementDetails.data[0].id : null;
            let userId = engagement.relationships.user.data.id;
            return {
                'type': 'engagements',
                'id': engagement.id,
                'attributes': engagement.attributes,
                'engagementDetails': engagements.included
                    .filter(i => (i.type === 'engagement-details' && i.id === engagementDetailId))
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
                    .filter(i => (i.type === 'user' && i.id === userId))
                    .map((user) => {
                        return user.attributes.first_name + ' ' + user.attributes.last_name;
                    }).reduce(a => a),
                'supplier': getSupplier(engagements.included, matchedItemId)
            };
        });

    const sentEngagements = engagements.data.filter(i => i.attributes.status === 5)
        .map((engagement) => {
            let matchedItemId = engagement.relationships.matchedItem.data.id;
            let engagementDetailId = engagement.relationships.engagementDetails.data[0].id;
            let userId = engagement.relationships.user.data.id;
            return {
                'type': 'engagements',
                'id': engagement.id,
                'attributes': engagement.attributes,
                'engagementDetails': engagements.included
                    .filter(i => (i.type === 'engagement-details' && i.id === engagementDetailId))
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
                    .filter(i => (i.type === 'user' && i.id === userId))
                    .map((user) => {
                        return user.attributes.first_name + ' ' + user.attributes.last_name;
                    }).reduce(a => a),
                'supplier': getSupplier(engagements.included, matchedItemId)
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
        axios.delete(`searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}`, { data:engagement })
        .then((response) => {
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
            window.console.log('response:', response);
        }).catch((error) => {
            window.console.log('error:', error);
        });
    };
}

export function sendEngagements() {
    return (dispatch, getState) => {
        const quoteId = getState().itemsReducer.quoteId;
        let sendToAll = {
            data: [{
                sendToAll: false
            }]
        };
        axios.post(`searcher-quote-requests/${quoteId}/engagements`, sendToAll).then((response) => {
            window.console.log('sent engagement', response);
            dispatch(loadEngagements(quoteId));
        });
    };
}
