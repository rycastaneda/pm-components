import {
    REQUIREMENTS_REQUESTED,
    IS_SAVING,
    REQUIREMENTS_RECEIVED,
    REQUIREMENTS_RELATIONSHIP_UPDATED,
    IS_EDITING,
    IS_DELETED,
    IS_EMPTY_ADDED,
    IS_SAVED,
    IS_CREATED,
    UPDATE_TEXT,
    UPDATE_INCLUSIONS_CATEGORY,
    UPDATE_MANDATORY_SELECTION,
    UPDATE_QUOTE_ID,
    TOGGLE_VIEW_FULL_TEXT
} from '../constants/ActionTypes';

const DEFAULT_EMPTY_ITEM = {
    id: 0,
    isEditing: true,
    viewFullText: false,
    isSaving: false,
    attributes: {
        mandatory: false,
        include: false,
        can_edit:true,
        text: '',
        category_id: null,
        quote_request_id: null
    }
};

const DEFAULT_STATE = {
    items: [],
    areLoading: false,
    requirementsRelationship: [],
    quoteRelationships: {},
    quoteId: ''
};

export function quoteRequirements(state = DEFAULT_STATE, action) {
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
        case UPDATE_QUOTE_ID:
            return Object.assign({}, state, {
                quoteId: action.quoteId
            });
        case REQUIREMENTS_RELATIONSHIP_UPDATED:
            return Object.assign({}, state, {
                requirementsRelationship: action.requirementsRelationship
            });
        case UPDATE_TEXT:
        case UPDATE_INCLUSIONS_CATEGORY:
        case UPDATE_MANDATORY_SELECTION:
        case IS_EMPTY_ADDED:
        case IS_SAVING:
        case IS_SAVED:
        case IS_CREATED:
        case IS_DELETED:
        case IS_EDITING:
        case TOGGLE_VIEW_FULL_TEXT:
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
        case IS_SAVING:
            return state.map(item =>
                item.id === action.id ?
                { ...item, id: action.id, isSaving: action.isSaving } : item
            );
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
        case TOGGLE_VIEW_FULL_TEXT:
            return state.map(item =>
                item.id === action.id ?
                { ...item, viewFullText: !item.viewFullText } : item
            );
        case UPDATE_TEXT:
            return state.map(item =>
                item.id === action.id ?
                { ...item,
                    attributes: Object.assign({}, item.attributes, {
                        text: action.text
                    }) } : item
            );
        case UPDATE_MANDATORY_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                { ...item,
                    attributes: Object.assign({}, item.attributes, {
                        mandatory: action.mandatory
                    }) } : item
            );
        case UPDATE_INCLUSIONS_CATEGORY:
            return state.map(item =>
                item.id === action.id ?
                { ...item,
                    attributes: Object.assign({}, item.attributes, {
                        include: action.include,
                        category_id: action.category_id,
                        quote_request_id: action.quote_request_id
                    }) } : item
            );
        default:
            return state;
    }
}
