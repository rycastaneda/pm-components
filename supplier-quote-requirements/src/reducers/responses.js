import {
    REQUIREMENTS_RECEIVED,
    UPDATE_SELECTION,
    DELETE_SELECTION
} from '../constants/ActionTypes';

const DEFAULT_STATE = {
    byId: {},
    allIds: []
};

export function responses(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUIREMENTS_RECEIVED: return responsesReceived(state, action);
        case UPDATE_SELECTION: return updateSelection(state, action);
        case DELETE_SELECTION: return deleteSelection(state, action);
        default:
            return state;
    }
}

function deleteSelection(state, action) {
    const requirementIds = Object.keys(state.byId);
    const requirements = {
        ...state
    };

    requirements.byId = {};

    requirementIds.map((id) => {
        if (action.requirementId !== id) {
            requirements.byId[id] = state.byId[id];
        }
    });

    return Object.assign({}, requirements);
}

function responsesReceived(state, action) {
    const { requirements } = action;

    requirements
        .filter(requirement => requirement.type === 'searcher-requirement-response')
        .map((response) => {
            state.allIds.push(response.attributes.searcher_requirement_id);
            state.byId[response.attributes.searcher_requirement_id] = Object.assign({}, response.attributes, {
                id: response.id,
                type: response.type
            });
        });

    return Object.assign({}, state);
}

function updateSelection(state, action) {
    return {
        ...state,
        byId: {
            ...state.byId,
            [action.requirementId]: {
                ...state.byId[action.requirementId],
                id: action.responseId,
                type: 'searcher-requirement-response',
                searcher_requirement_id: action.requirementId,
                response: action.response,
                comment: action.comment,
                matched_item_id: action.matchedItemId
            }
        }
    };
}