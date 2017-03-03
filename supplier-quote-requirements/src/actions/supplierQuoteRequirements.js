import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_SELECTION,
    TOGGLE_COMMENTS_DISPLAY
} from '../constants/ActionTypes';

import axios from 'axios';

export function getItems(quoteId, matchedItemId, requestItemId) {
    return (dispatch) => {
        dispatch({
            type: REQUIREMENTS_REQUESTED,
            quoteId,
            matchedItemId,
            requestItemId
        });

        const endpoint = `/supplier-quote-requests/${quoteId}/requested-items/${requestItemId}?include=searcherRequirements`;

        axios.get(matchedItemId ? `${endpoint}.searcherRequirementResponses:matched_item_id(${matchedItemId})` : endpoint)
            .then((response) => {
                if (response.status === 200 && response.data.included) {
                    dispatch({
                        type: REQUIREMENTS_RECEIVED,
                        requirements: response.data.included
                    });
                }
            });
    };
}

export function updateSelection(responseId, requirementId, response, comment) {
    return (dispatch, getState) => {
        const {
            quoteId,
            matchedItemId
        } = getState().requirements;
        
        const endpoint = `/supplier-quote-requests/${quoteId}/matched-items/${matchedItemId}/searcher-requirement-responses`;

        if (!matchedItemId) {
            return dispatch({
                type: UPDATE_SELECTION,
                requirementId,
                matchedItemId,
                responseId,
                response,
                comment
            });
        }

        if (!responseId) {
            // Do a POST request to create a new response object
            let searcherRequirementResponses = {
                data: {
                    type: 'searcher-requirement-responses',
                    id: null,
                    attributes: {
                        'searcher_requirement_id': requirementId,
                        response,
                        comment
                    },
                    relationships: {
                        'searcherRequirements': {
                            data: {
                                type: 'searcher-requirements',
                                id: requirementId
                            }
                        }
                    }
                }
            };

            axios.post(endpoint, searcherRequirementResponses)
                .then((responseData) => {
                    dispatch({
                        type: UPDATE_SELECTION,
                        requirementId,
                        matchedItemId,
                        responseId: responseData.data.data.id,
                        response,
                        comment
                    });
                });
        } else {
            // Do a PATCH to update the existing response
            const supplierResponse = {
                data: {
                    type: 'searcher-requirement-responses',
                    responseId,
                    attributes: {
                        response,
                        comment
                    }
                }
            };

            axios.patch(endpoint + `/${responseId}`, supplierResponse).then(() => {
                dispatch({
                    type: UPDATE_SELECTION,
                    requirementId,
                    matchedItemId,
                    responseId,
                    response,
                    comment
                });
            });
        }
    };
}

export function toggleCommentsDisplay(requirement) {
    return {
        type: TOGGLE_COMMENTS_DISPLAY,
        id: requirement.id
    };
}
