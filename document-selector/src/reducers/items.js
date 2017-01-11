import { 
    REQUESTED_ITEMS_FETCHING, 
    REQUESTED_ITEMS_RECEIVING
} from '../constants/DocumentSelector';

const INITIAL_STATE = { 
    loading: false,
    data: []
};

export function documentSelector(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUESTED_ITEMS_FETCHING:
            return Object.assign({}, state, {
                loading: false
            });
        case REQUESTED_ITEMS_RECEIVING:
            return Object.assign({}, state, {
                loading: true,
                groups: action.groups
            });
        default:
            return state;
    }
}