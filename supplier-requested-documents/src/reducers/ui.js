import {
    FETCH_REQUIREMENTS,
    FETCH_FAILED,
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    loading: true,
    error: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS: 
            return {
                ...state,
                loading: true,
                readOnly: action.readOnly
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

