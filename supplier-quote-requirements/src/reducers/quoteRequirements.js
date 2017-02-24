import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_QUOTE_ID,
    UPDATE_QUOTE_ITEM_ID,
    UPDATE_REQUEST_ITEM_ID,
    UPDATE_REQUEST_BY_TO_ITEM_ID,
    ADD_DEFAULT_SUPPLIER_RESPONSE,
    UPDATE_SUPPLIER_RESPONSE_ID,
    UPDATE_COMMENTS,
    UPDATE_SELECTION,
    SAVE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY
} from '../constants/ActionTypes';

const DEFAULT_ITEM = {
    displayCommentsField: false,
    supplierResponse: {},
    commentsAreSaved: false,
    buttons: [{
        id: 1,
        value: 'Yes'
    }, {
        id: 2,
        value: 'No'
    }, {
        id: 3,
        value: 'N/A'
    }]
};

const DEFAULT_STATE = {
    items: [],
    areLoading: false,
    quoteId: null,
    itemId: null
};

const DEFAULT_SUPPLIER_RESPONSE = {
    type: 'searcher-requirement-responses',
    id: null,
    attributes: {
        comment: '',
        response: ''
    }
};

export function quoteRequirements(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUIREMENTS_REQUESTED:
            return { ...state, areLoading: true };
        case REQUIREMENTS_RECEIVED:
            return {
                ...state,
                items: action.items.map(i => Object.assign({}, DEFAULT_ITEM, i)),
                areLoading: false
            };
        case UPDATE_QUOTE_ID:
            return { ...state, quoteId: action.id };
        case UPDATE_QUOTE_ITEM_ID:
            return { ...state, itemId: action.id };
        case UPDATE_REQUEST_ITEM_ID:
            return { ...state, requestItemId: action.id };
        case UPDATE_REQUEST_BY_TO_ITEM_ID:
            return { ...state, requestByToItemId: action.id };
        case ADD_DEFAULT_SUPPLIER_RESPONSE:
        case UPDATE_SUPPLIER_RESPONSE_ID:
        case UPDATE_COMMENTS:
        case UPDATE_SELECTION:
        case SAVE_COMMENTS:
        case TOGGLE_COMMENTS_DISPLAY:
            return Object.assign({}, state, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case SAVE_COMMENTS:
            return state.map(item =>
                item.id === action.id ?
                { ...item, commentsAreSaved: true } : item
            );
        case TOGGLE_COMMENTS_DISPLAY:
            return state.map(item =>
                item.id === action.id ?
                { ...item, displayCommentsField: !item.displayCommentsField } : item
            );
        case ADD_DEFAULT_SUPPLIER_RESPONSE:
            return state.map(item =>
                item.id === action.id ?
                { ...item, supplierResponse: DEFAULT_SUPPLIER_RESPONSE } : item
            );
        case UPDATE_SUPPLIER_RESPONSE_ID:
        case UPDATE_COMMENTS:
        case UPDATE_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                    Object.assign({}, item, supplierResponse(item.supplierResponse, action)) : item
            );
        default:
            return state;
    }
}

function supplierResponse(state = {}, action) {
    switch (action.type) {
        case UPDATE_SUPPLIER_RESPONSE_ID:
            return {
                supplierResponse: {
                    ...state,
                    id: action.supplierId
                }
            };
        case UPDATE_COMMENTS:
            return {
                supplierResponse: {
                    ...state,
                    attributes: { ...state.attributes, comment: action.comment }
                }
            };
        case UPDATE_SELECTION:
            return {
                supplierResponse: {
                    ...state,
                    attributes: { ...state.attributes, response: action.value }
                }
            };
        default:
            return state;
    }
}
