import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_COMMENTS,
    UPDATE_SELECTION,
    SAVE_COMMENTS
} from '../constants/ActionTypes';

export function quoteRequirements(state = { items: [], areLoading: false }, action) {
    switch (action.type) {
        case REQUIREMENTS_REQUESTED:
            return Object.assign({}, state, {
                areLoading: true
            });
        case REQUIREMENTS_RECEIVED:
            return Object.assign({}, state, {
                items: action.items,
                areLoading: false
            });
        case UPDATE_COMMENTS:
        case UPDATE_SELECTION:
        case SAVE_COMMENTS:
            return Object.assign({}, state, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case UPDATE_COMMENTS:
            return [...state, {}];
        case SAVE_COMMENTS:
            return state.map(item =>
                item.id === 0 ?
                { ...item, id: action.id, isEditing: false } : item
            );
        case UPDATE_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                { ...item,
                    attributes: Object.assign({}, item.attributes, {
                        selection: action.selection
                    })
                } : item
            );
        default:
            return state;
    }
}