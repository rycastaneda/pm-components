import {
    REQUEST_STARTED,
    REQUEST_COMPLETED,
    REQUEST_ERROR,
    DISPLAY_SUCCESS,
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

export function loadEngagements(quoteId) {
    return (dispatch) => {
        dispatch({ type: REQUEST_STARTED });
        axios.get(`/searcher-quote-requests/${quoteId}/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem&fields[engagements]=status,engagement_text,item_id,po_number,po_file_id,po_value,auto_decline_flag,pre_start_date,created_at,updated_at,can_cancel`)
        .then((response) => {
            // response.data = { 'data':[{ 'type':'engagements', 'id':'33', 'attributes':{ 'status':1, 'po_number':'W55392', 'po_value':'0', 'pre_start_date':'2017-03-15'  }, 'relationships':{ 'user':{ 'data':{ 'type':'user', 'id':'1' }  }, 'engagementDetails':{ 'data':[{ 'type':'engagement-details', 'id':'39' }, { 'type':'engagement-details', 'id':'40' }, { 'type':'engagement-details', 'id':'41' }]  }, 'matchedItem':{ 'data':{ 'type':'matched-item', 'id':'3704028' } } } }], 'included':[{ 'type':'pricing-option', 'id':'9', 'attributes':{ 'title':'Mobilisation Total' } }, { 'type':'pricing-option', 'id':'1', 'attributes':{ 'title':'Dry Hourly' } }, { 'type':'pricing-option', 'id':'11', 'attributes':{ 'title':'Demobilisation Total' } }, { 'type':'supplier', 'id':'540890', 'attributes':{ 'title':'Coates Hire' } }, { 'type':'requested-item', 'id':'64747', 'attributes':{ 'title':'Wheeled Skid Steer' } }, { 'type':'user', 'id':'1', 'attributes':{ 'first_name':'Troy', 'last_name':'Redden', 'mobile':'07 4130 4550', 'is_organisation_admin':1, 'position':'', 'staff_company':null, 'staff_phone':'07 4130 4550', 'state_id':10424 } }, { 'type':'engagement-details', 'id':'39', 'attributes':{ 'rate_value':'110', 'unit':1  }, 'relationships':{ 'pricingOption':{ 'data':{ 'type':'pricing-option', 'id':'9' } } } }, { 'type':'engagement-details', 'id':'40', 'attributes':{ 'rate_value':'60', 'unit':6 }, 'relationships':{ 'pricingOption':{ 'data':{ 'type':'pricing-option', 'id':'1' } } } }, { 'type':'engagement-details', 'id':'41', 'attributes':{ 'rate_value':'110', 'unit':1 }, 'relationships':{ 'pricingOption':{ 'data':{ 'type':'pricing-option', 'id':'11' } } } }, { 'type':'matched-item', 'id':'3704028', 'attributes':{ 'quantity':1, 'title':'12005 - Skid Steer Loader - iii - Large'  }, 'relationships':{ 'matchedSupplier':{ 'data':[{ 'type':'supplier', 'id':'540890' }] }, 'requestedItem':{ 'data':{ 'type':'requested-item', 'id':'64747' } } } }] };
            dispatch(loadEngagementsSuccess(response.data));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response && error.response.data || error });
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
                'supplier': getSupplier(engagements.included, matchedItemId)
            };
        });

    const sentEngagements = engagements.data.filter(i => i.attributes.status === 5 || i.attributes.status === 2)
        .map((engagement) => {
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
            dispatch({ type: REQUEST_ERROR, error: error.response && error.response.data || error });
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
        dispatch({ type: REQUEST_STARTED });
        axios.post(`searcher-quote-requests/${quoteId}/requested-items/${requestedItemId}/matched-items/${matchedItemId}/engagements/${engagementId}/cancel`, { data:engagement })
        .then((response) => {
            dispatch({
                type: ENGAGEMENT_CANCELLED,
                id: engagementId
            });
            window.console.log('response:', response);
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response && error.response.data || error });
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
        dispatch({ type: REQUEST_STARTED });
        axios.post(`searcher-quote-requests/${quoteId}/engagements`, sendToAll).then((response) => {
            window.console.log('sent engagement', response);
            dispatch(loadEngagements(quoteId));
            dispatch({ type: REQUEST_COMPLETED });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response && error.response.data || error });
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
        dispatch({ type: REQUEST_STARTED });
        axios.post(`browse-panels/${panelId}/items/${itemId}/engagements/${engagementId}`).then((response) => {
            window.console.log('sent engagement', response);
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: DISPLAY_SUCCESS, message: `Engagement #${engagementId} created and sent successfully` });
        }).catch((error) => {
            dispatch({ type: REQUEST_COMPLETED });
            dispatch({ type: REQUEST_ERROR, error: error.response && error.response.data || error });
        });
    };
}
