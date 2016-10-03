import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    UPDATE_INPUT,
    UPDATE_SUGGESTIONS_CACHE
} from '../constants/ActionTypes';
import {
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    SET_INITIAL_STATE
} from '../constants/ActionTypes';

const INITIAL_CATEGORY_SELECTOR_STATE = {
    selectedType: '',
    suggestions: [],
    dropDowns: []
};

const DEFAULT_DROPDOWN = {
    input: '',
    suggestionsCache: [],
    selectedCategory: {}
};


export function categorySelector(state = INITIAL_CATEGORY_SELECTOR_STATE, action) {
    switch (action.type) {
        case SELECT_CATEGORY_TYPE:
            return Object.assign({}, state, {
                selectedType: action.filterType
            });
        case RECEIVE_SUGGESTIONS:
        case RESET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.suggestions
            });
        case SET_INITIAL_STATE:
            return Object.assign({}, state, INITIAL_CATEGORY_SELECTOR_STATE);
        case 'ADD_DROPDOWN':
        case UPDATE_SUGGESTIONS_CACHE:
        case UPDATE_INPUT:
        case SELECT_CATEGORY:
            return Object.assign({}, state, {
                dropDowns: dropDowns(state.dropDowns, action)
            });
        default:
            return state;
    }
}

function dropDowns(state = [], action) {
    switch (action.type) {
        case 'ADD_DROPDOWN':
            return [
                ...state.slice(0, action.index),
                DEFAULT_DROPDOWN,
                ...state.slice(action.index + 1)
            ];
        case UPDATE_SUGGESTIONS_CACHE:
            return state.map((dropDown, index) => {
                if (index === action.index) {
                    return Object.assign({}, dropDown, {
                        suggestionsCache: action.suggestionsCache
                    });
                }
                return dropDown;
            });
        case UPDATE_INPUT:
            return state.map((dropDown, index) => {
                if (index === action.index) {
                    return Object.assign({}, dropDown, {
                        input: action.value
                    });
                }
                return dropDown;
            });
        case SELECT_CATEGORY:
            return state.map((dropDown, index) => {
                if (index === action.index) {
                    return Object.assign({}, dropDown, {
                        selectedCategory: action.category
                    });
                }
                return dropDown;
            });
        default:
            return state;
    }

}

function categories(state = { isFetching: false, error: false, categories: [] }, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            });
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                categories: action.categories
            });
        default:
            return state;
    }
}

export function fetchedCategoryTypes(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                [action.filterType]: categories(state[action.filterType], action)
            });
        default:
            return state;
    }

}
