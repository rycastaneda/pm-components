import {
    FETCH_REQUIREMENTS,
    FETCH_FAILED,
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    loading: true,
    itemId: null,
    quoteId: null, 
    requirementId: null,
    error: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS: 
            return {
                ...state,
                loading: true,
                readOnly: action.readOnly,
                itemId: action.itemId,
                quoteId: action.quoteId,
                requirementId: action.requirementId
            };
        case RECEIVE_REQUIREMENTS: 
            return {
                ...state,
                loading: false
            };
        case FETCH_FAILED:
            return {
                ...state,
                error: FETCH_FAILED
            };
        default:
            return state;
    }
}

