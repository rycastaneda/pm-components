import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_FAILED,
    RECEIVE_ENGAGEMENTS,
    RESET_CURRENT_ENGAGEMENT,
    RESET_PRICING_OPTIONS,
    ENGAGEMENT_DELETED
} from '../constants/ActionTypes';

import axios from 'axios';

export function loadEngagements(quoteId) {
    return (dispatch) => {
        dispatch({ type: REQUEST_STARTED });
        axios.get(`/searcher-quote-requests/${quoteId}/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem`)
        .then((response) => {
            // response.data = { 'data':[{ 'type':'engagements', 'id':'7', 'attributes':{ 'status':1, 'po_number':'34535', 'po_value':'0', 'pre_start_date':'2017-03-02' }, 'relationships': { 'user': { 'data': { 'type':'user', 'id':'1' } }, 'matchedItem': { 'data': { 'type':'matched-item', 'id':'3698397' }  }, 'engagementDetails': { 'data':[{ 'type':'engagement-details', 'id':'8' }, { 'type':'engagement-details', 'id':'9' }] }  }  },  { 'type':'engagements', 'id':'9', 'attributes': { 'status':1, 'po_number':'WO-11650', 'po_value':'0', 'pre_start_date':'2017-02-28' }, 'relationships': { 'user': { 'data': { 'type':'user', 'id':'1' }  }, 'matchedItem': { 'data': { 'type':'matched-item', 'id':'3698397' }  }, 'engagementDetails': { 'data':[{ 'type':'engagement-details', 'id':'11' },  { 'type':'engagement-details', 'id':'12' },  { 'type':'engagement-details', 'id':'13' }] }  }  }], 'included':[{ 'type':'supplier', 'id':'537879', 'attributes': { 'title':'Coates Hire' }  }, { 'type':'requested-item', 'id':'64559', 'attributes': { 'title':'6 - 10 Tonne Excavator' }  }, { 'type':'pricing-option', 'id':'12', 'attributes': { 'title':'Demobilisation per Km' }  }, { 'type':'pricing-option', 'id':'10', 'attributes': { 'title':'Mobilisation per Km' }  }, { 'type':'pricing-option', 'id':'2', 'attributes': { 'title':'Dry Daily' }  }, { 'type':'user', 'id':'1', 'attributes': { 'first_name':'Troy', 'last_name':'Redden', 'mobile':'07 4130 4550', 'is_organisation_admin':1, 'position':'', 'staff_company':null, 'staff_phone':'07 4130 4550', 'state_id':10424 }  }, { 'type':'matched-item', 'id':'3698397', 'attributes': { 'quantity':1, 'title':'11650 - Excavator 7.0 - 8.0 Tonne' }, 'relationships': { 'matchedSupplier': { 'data':[{ 'type':'supplier', 'id':'537879' }] }, 'requestedItem': { 'data': { 'type':'requested-item', 'id':'64559' }  }  }  },  { 'type':'engagement-details', 'id':'8', 'attributes': { 'rate_value':'150', 'unit':1 }, 'relationships': { 'pricingOption': { 'data': { 'type':'pricing-option', 'id':'12' }  }  }  },  { 'type':'engagement-details', 'id':'9', 'attributes': { 'rate_value':'150', 'unit':1 }, 'relationships': { 'pricingOption': { 'data': { 'type':'pricing-option', 'id':'10' }  }  }  },  { 'type':'engagement-details', 'id':'11', 'attributes': { 'rate_value':'150', 'unit':100 }, 'relationships': { 'pricingOption': { 'data': { 'type':'pricing-option', 'id':'2' }  }  }  },  { 'type':'engagement-details', 'id':'12', 'attributes': { 'rate_value':'150', 'unit':300 }, 'relationships': { 'pricingOption': { 'data': { 'type':'pricing-option', 'id':'12' }  }  }  },  { 'type':'engagement-details', 'id':'13', 'attributes': { 'rate_value':'150', 'unit':200 }, 'relationships': { 'pricingOption': { 'data': { 'type':'pricing-option', 'id':'10' }  }  }  }] } ;
            dispatch(loadEngagementsSuccess(response.data));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_FAILED, error: error.response.data });
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
            let userId = engagement.relationships.user.data.id;
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
            let engagementDetailIds = engagement.relationships.engagementDetails.data.length ?
                engagement.relationships.engagementDetails.data.map(engagementDetail => engagementDetail.id) : null;
            let userId = engagement.relationships.user.data.id;
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
        dispatch({ type: REQUEST_STARTED });
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
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_FAILED, error: error.response.data });
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
        dispatch({ type: REQUEST_STARTED });
        axios.post(`searcher-quote-requests/${quoteId}/engagements`, sendToAll).then((response) => {
            window.console.log('sent engagement', response);
            dispatch(loadEngagements(quoteId));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_FAILED, error: error.response.data });
        });
    };
}

export function sendEngagementsBrowse(engagementId) {
    return (dispatch, getState) => {
        const panelId = getState().itemsReducer.panelId;
        const itemId = getState().itemsReducer.itemId;
        dispatch({ type: REQUEST_STARTED });
        axios.post(`browse-panels/${panelId}/items/${itemId}/engagements/${engagementId}`).then((response) => {
            window.console.log('sent engagement', response);
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_FAILED, error: error.response.data });
        });
    };
}
