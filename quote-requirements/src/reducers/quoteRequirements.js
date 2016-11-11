import {
    IS_EDITING, IS_DELETED, SAVE_REQUIREMENT, UPDATE_TEXT,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_MANDATORY_SELECTION, ADD_NEW_ITEM,
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    IS_DEFAULT_ADDED,
    IS_SAVED
} from '../constants/ActionTypes';

const NEW_EMPTY_ITEM = {
    id: 0,
    isEditing: true,
    alwaysDisplay: false,
    attributes: {}
};

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
        case SAVE_REQUIREMENT:
        case UPDATE_TEXT:
        case UPDATE_INCLUSIONS_CATEGORY:
        case UPDATE_INCLUSIONS_SELECTION:
        case UPDATE_MANDATORY_SELECTION:
        case IS_DEFAULT_ADDED:
        case IS_SAVED:
        case IS_DELETED:
        case IS_EDITING:
        case ADD_NEW_ITEM:
            return Object.assign({}, state, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case IS_DEFAULT_ADDED:
            return [...state, NEW_EMPTY_ITEM];
        case IS_SAVED:
            return state.map(item =>
                item.id === action.id ?
                { ...item, id: 60, isEditing: false } : item
            );
        case IS_DELETED:
            return state.filter(item =>
                item.id !== action.id
            );
        case IS_EDITING:
            return state.map(item =>
                item.id === action.id ?
                { ...item, isEditing: !item.isEditing } : item
            );
        case UPDATE_TEXT:
            return state.map(item =>
                item.id === action.id ?
                    {
                        ...item,
                        attributes: Object.assign({}, item.attributes, {
                            text: action.text
                        })
                    } : item
            );
        case UPDATE_MANDATORY_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                    {
                        ...item,
                        attributes: Object.assign({}, item.attributes, {
                            isMandatory: action.isMandatory
                        })
                    } : item
            );
        case UPDATE_INCLUSIONS_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                    {
                        ...item,
                        attributes: Object.assign({}, item.attributes, {
                            include: action.include
                        })
                    } : item
            );
        case UPDATE_INCLUSIONS_CATEGORY:
            return state.map(item =>
                item.id === action.id ?
                    {
                        ...item,
                        attributes: Object.assign({}, item.attributes, {
                            'category_id': action.category
                        })
                    } : item
            );
        default:
            return state;
    }

}