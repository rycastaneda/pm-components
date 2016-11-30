import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    UPDATE_COMMENTS,
    UPDATE_SELECTION,
    SAVE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY
} from '../constants/ActionTypes';

const DEFAULT_ITEM = {
    comments: '',
    displayCommentsField: false,
    commentsAreSaved: false,
    buttonSelected: {},
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
    supplierResponses: []
};

export function quoteRequirements(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUIREMENTS_REQUESTED:
            return Object.assign({}, state, {
                areLoading: true
            });
        case REQUIREMENTS_RECEIVED:
            return Object.assign({}, state, {
                items: action.items.map(i => Object.assign({}, i, DEFAULT_ITEM)),
                areLoading: false
            });
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
        case UPDATE_COMMENTS:
            return state.map(item =>
                item.id === action.id ?
                { ...item, comments: action.value, commentsAreSaved: false } : item
            );
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
        case UPDATE_SELECTION:
            return state.map(item =>
                item.id === action.id ?
                { ...item, buttonSelected: action.buttonSelected } : item
            );
        default:
            return state;
    }
}