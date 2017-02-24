import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_QUOTE_ID,
    UPDATE_QUOTE_ITEM_ID,
    UPDATE_REQUEST_ITEM_ID,
    UPDATE_REQUEST_BY_TO_ITEM_ID,
    ADD_DEFAULT_SUPPLIER_RESPONSE,
    UPDATE_SUPPLIER_RESPONSE_ID,
    UPDATE_SELECTION,
    UPDATE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY,
    SAVE_COMMENTS
} from '../constants/ActionTypes';

import axios from 'axios';

function constructEndpoint(state) {
    return `/supplier-quote-requests/${state.quoteRequirements.quoteId}/requested-items/${state.quoteRequirements.requestItemId}`;
}

export function getItems() {
    return (dispatch, getState) => {
        dispatch(requestRequirements());

        axios.get(`${constructEndpoint(getState(), true)}?include=searcherRequirements,searcherRequirementResponses`)
            .then((response) => {
                const responses = response.data.included.filter(r => r.type === 'searcher-requirement-responses');
                const requirements = response.data.included.filter(r => r.type === 'searcher-requirements');

                const requirementsWithResponses = requirements.map((r) => {
                    const response = responses.filter(res => res.attributes.searcher_requirement_id === parseInt(r.id, 10));

                    return { ...r, supplierResponse: response[0] || {} };
                });

                dispatch(receiveRequirements(requirementsWithResponses));
            });
    };
}

export function handleButtonSelection(item, button) {

    return (dispatch, getState) => {
        if (!item.supplierResponse.id) {
            // Do a POST request to create a new response object
            let searcherRequirementResponses = {
                data: [{
                    type: 'searcher-requirement-responses',
                    id: null,
                    attributes: {
                        'searcher_requirement_id': item.id,
                        response: button.value,
                        comment: ''
                    },
                    relationships: {
                        'searcher-requirements': {
                            data: {
                                type: 'searcher-requirements',
                                id: parseInt(item.id, 10)
                            }
                        }
                    }
                }]
            };

            axios.post(`${constructEndpoint(getState())}`, searcherRequirementResponses).then((resp) => {
                dispatch(addDefaultSupplierResponse(item));
                dispatch(updateSupplierResponseId(item, resp.data.id));
                dispatch(updateButtonSelection(item, resp.data.attributes.response));
            });
        } else {
            // Do a PATCH to update the existing response
            const supplierResponse = {
                data: {
                    type: item.supplierResponse.type,
                    id: item.supplierResponse.id,
                    attributes: {
                        response: button.value
                    }
                }
            };

            axios.patch(`${constructEndpoint(getState())}`, supplierResponse).then((resp) => {
                dispatch(updateButtonSelection(item, resp.data.attributes.response));
            });
        }
    };
}


export function saveComments(item) {
    return (dispatch, getState) => {
        // Do a PATCH to update the existing response
        const supplierResponse = {
            type: item.supplierResponse.type,
            id: item.supplierResponse.id,
            attributes: {
                comment: item.supplierResponse.attributes.comment
            }
        };

        axios.patch(`${constructEndpoint(getState())}`, supplierResponse).then(() => {
            dispatch({
                type: SAVE_COMMENTS,
                id: item.id
            });
        });

    };
}

export function handleCommentsUpdate(item, comment) {
    return {
        type: UPDATE_COMMENTS,
        id: item.id,
        comment
    };
}

export function addDefaultSupplierResponse(item) {
    return {
        type: ADD_DEFAULT_SUPPLIER_RESPONSE,
        id: item.id
    };
}

export function toggleCommentsDisplay(item) {
    return {
        type: TOGGLE_COMMENTS_DISPLAY,
        id: item.id
    };
}

export function updateSupplierResponseId(item, id) {
    return {
        type: UPDATE_SUPPLIER_RESPONSE_ID,
        id: item.id,
        supplierId: id
    };
}

export function updateButtonSelection(item, value) {
    return {
        type: UPDATE_SELECTION,
        id: item.id,
        value
    };
}

export function requestRequirements() {
    return {
        type: REQUIREMENTS_REQUESTED
    };
}

export function receiveRequirements(items) {
    return {
        type: REQUIREMENTS_RECEIVED,
        items: items
    };
}

export function updateQuoteItemId(id) {
    return {
        type: UPDATE_QUOTE_ITEM_ID,
        id
    };
}

export function updateQuoteId(id) {
    return {
        type: UPDATE_QUOTE_ID,
        id
    };
}

export function updateRequestItemId(id) {
    return {
        type: UPDATE_REQUEST_ITEM_ID,
        id
    };
}

export function updateRequestByToItemId(id) {
    return {
        type: UPDATE_REQUEST_BY_TO_ITEM_ID,
        id
    };
}
