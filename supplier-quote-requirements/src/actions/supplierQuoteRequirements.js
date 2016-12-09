import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_QUOTE_ID,
    UPDATE_QUOTE_ITEM_ID,
    ADD_DEFAULT_SUPPLIER_RESPONSE,
    UPDATE_SUPPLIER_RESPONSE_ID,
    UPDATE_SELECTION,
    UPDATE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY,
    SAVE_COMMENTS
} from '../constants/ActionTypes';

import { readEndpoint, createEntity, updateEntity, setEndpointPath } from 'redux-json-api';

function constructEndpoint(state) {
    return `/supplier-quote-requests/${state.quoteRequirements.quoteId}/matched-items/${state.quoteRequirements.itemId}`;
}

export function getItems() {
    return (dispatch, getState) => {
        dispatch(requestRequirements());

        dispatch(readEndpoint(`${constructEndpoint(getState())}?include=searcherRequirements,searcherRequirementResponses`))
            .then((response) => {
                const responses = response.included.filter(r => r.type === 'searcher-requirement-responses');
                const requirements = response.included.filter(r => r.type === 'searcher-requirements');

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
        dispatch(setEndpointPath(constructEndpoint(getState())));

        if (!item.supplierResponse.id) {
            // Do a POST request to create a new response object
            dispatch(createEntity({
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
            })).then((resp) => {
                dispatch(addDefaultSupplierResponse(item));
                dispatch(updateSupplierResponseId(item, resp.data.id));
                dispatch(updateButtonSelection(item, resp.data.attributes.response));
            });

        } else {
            // Do a PATCH to update the existing response
            dispatch(updateEntity({
                type: item.supplierResponse.type,
                id: item.supplierResponse.id,
                attributes: {
                    response: button.value
                }
            })).then((resp) => {
                dispatch(updateButtonSelection(item, resp.data.attributes.response));
            });
        }
    };
}


export function saveComments(item) {
    return (dispatch) => {
        // Do a PATCH to update the existing response
        dispatch(updateEntity({
            type: item.supplierResponse.type,
            id: item.supplierResponse.id,
            attributes: {
                comment: item.supplierResponse.attributes.comment
            }
        })).then(() => {
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
