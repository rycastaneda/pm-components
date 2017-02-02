import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS
} from '../constants';

const INITIAL_STATE = {
    loading: true 
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS: 
            return {
                ...state,
                loading: true
            };
        case RECEIVE_REQUIREMENTS: 
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

