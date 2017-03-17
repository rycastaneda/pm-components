import {
    REQUIREMENTS_REQUESTED,
    REQUIREMENTS_RECEIVED,
    SAVE_COMMENTS,
    UPDATE_SELECTION,
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
            state.byId[action.id].displayCommentsForm = !state.byId[action.id].displayCommentsForm;
            return Object.assign({}, state);
        case UPDATE_SELECTION:
            state.byId[action.requirementId].displayCommentsForm = false;
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
                displayCommentsForm: false
            });
        });

    requirements
        .filter(requirement => requirement.type === 'searcher-requirement-response');
        // .map((response) => {
        //     state.byId[response.attributes.searcher_requirement_id].displayCommentsForm = !!response.attributes.comment;
        // });

    return Object.assign({}, state);
}
