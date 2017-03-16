import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    SAVE_COMMENTS,
    TOGGLE_COMMENTS_DISPLAY
} from '../constants/ActionTypes';

const DEFAULT_STATE = {
    byId: {},
    allIds: [],
    areLoading: false,
    quoteId: null,
    matchedItemId: null,
    requestItemId: null
};

export function requirements(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUIREMENTS_REQUESTED:
            return { 
                ...state, 
                areLoading: true,
                matchedItemId: action.matchedItemId, // initalize params in state
                quoteId: action.quoteId,
                requestItemId: action.requestItemId
            };
        case REQUIREMENTS_RECEIVED: return requirementsReceived(state, action);
        case SAVE_COMMENTS:
        case TOGGLE_COMMENTS_DISPLAY:
            state.byId[action.id].displayComments = !state.byId[action.id].displayComments;
            return Object.assign({}, state);
        default:
            return state;
    }
}

function requirementsReceived(state, action) {
    const { requirements } = action;

    requirements
        .filter(requirement => requirement.type === 'searcher-requirements')
        .map((requirement) => {
            state.allIds.push(requirement.id);
            state.byId[requirement.id] = Object.assign({}, requirement.attributes, {
                id: requirement.id,
                type: requirement.type,
                displayComments: true
            });
        });

    return Object.assign({}, state);
}

