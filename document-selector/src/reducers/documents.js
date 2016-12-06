import { 
    DOCUMENTS_FETCHING, 
    DOCUMENTS_RECEIVING,
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';

const INITIAL_STATE = { 
    loading: false,
    data: []
};

export function documentSelector(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENTS_FETCHING:
            return Object.assign({}, state, {
                loading: false
            });
        case DOCUMENTS_RECEIVING:
            return Object.assign({}, state, {
                loading: true,
                groups: action.groups
            });
        case REQUESTED_ITEM_TOGGLE: 
            return Object.assign({}, state, { 
                groups: action.groups.map((group) => {
                    if (group.id === action.item.id) {
                        group.relationships.push(action.item);
                    }
                    return group;
                })
            });
        default:
            return state;
    }
}