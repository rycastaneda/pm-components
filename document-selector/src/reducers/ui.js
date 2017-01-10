import { 
    DOCUMENTS_FETCHING, 
    DOCUMENTS_RECEIVING
} from '../constants/DocumentSelector';

const INITIAL_STATE = { 
    loading: false
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_FETCHING:
            return Object.assign({}, state, {
                loading: true
            });
        case DOCUMENTS_RECEIVING: 
            return Object.assign({}, state, {
                loading: false
            });
        default:
            return state;
    }
}