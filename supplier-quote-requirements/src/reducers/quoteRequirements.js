import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    IS_EDITING,
    IS_DELETED,
    IS_EMPTY_ADDED,
    IS_SAVED,
    IS_CREATED,
    UPDATE_TEXT,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_INCLUSIONS_SELECTION,
    UPDATE_MANDATORY_SELECTION
} from '../constants/ActionTypes';

const DEFAULT_EMPTY_ITEM = {
    id: 0,
    isEditing: true,
    attributes: {
        mandatory: false,
        include: false,
        text: ''
    }
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
        case UPDATE_TEXT:
        case UPDATE_INCLUSIONS_CATEGORY:
        case UPDATE_INCLUSIONS_SELECTION:
        case UPDATE_MANDATORY_SELECTION:
        case IS_EMPTY_ADDED:
        case IS_SAVED:
        case IS_CREATED:
        case IS_DELETED:
        case IS_EDITING:
            return Object.assign({}, state, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case IS_EMPTY_ADDED:
            return [...state, DEFAULT_EMPTY_ITEM];
        case IS_SAVED:
            return state.map(item =>
                item.id === action.id ?
                { ...item, id: action.id, isEditing: false } : item
            );
        case IS_CREATED:
            return state.map(item =>
                item.id === 0 ?
                { ...item, id: action.id, isEditing: false } : item
            );
        case IS_DELETED:
            return state.filter(item =>
                item.id !== action.id
            );
        case IS_EDITING:
            return state.map(item =>
                item.id === action.id ?
                { ...item, isEditing: true } : item
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
                            mandatory: action.mandatory
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
                            'category_id': `${action.category_id}`
                        })
                    } : item
            );
        default:
            return state;
    }
}