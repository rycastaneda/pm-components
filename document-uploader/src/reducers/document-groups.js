import {
    API_READ_FAILED,
    LOADING_GROUPS,
    RECEIVING_GROUPS,
    ADDED_GROUP,
    TOGGLING_RENAME_GROUP,
    UPDATING_GROUP,
    GROUP_REMOVED,
    GROUP_RENAMED,
    DOCUMENT_UPLOADED,
    REMOVING_DOCUMENT
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    data: [], // array of document groups
    loading: false
};

const DEFAULT_ERROR = 'Request failed. Please try again later.';

const DEFAULT_GROUP_STATES = {
    attributes: {
        is_updating: false,
        is_renaming: false
    }
};

export function documentGroups(state = INITIAL_STATE, action) {
    switch (action.type) {
        case API_READ_FAILED:
            return Object.assign({}, state, {
                loading: false,
                error: action.response || DEFAULT_ERROR
            });
        case LOADING_GROUPS:
            return Object.assign({}, state, {
                loading: true
            });
        case RECEIVING_GROUPS:
            // ADD DEFAULT GROUP STATES
            return Object.assign({}, state, {
                loading: false,
                data: action.groups.data.map((group) => {
                    Object.assign(group.attributes, DEFAULT_GROUP_STATES.attributes);
                    return group;
                })
            });
        case ADDED_GROUP:
        case GROUP_REMOVED:
        case UPDATING_GROUP:
        case GROUP_RENAMED:
        case REMOVING_DOCUMENT:
        case DOCUMENT_UPLOADED:
        case TOGGLING_RENAME_GROUP:
            return Object.assign({}, state, {
                loading: false,
                data: groups(state.data, action)
            });
        default:
            return state;
    }
}

function groups(state = [], action) {
    function updatingGroup(toUpdate, index = action.index) {
        return [
            ...state.slice(0, index),
            Object.assign({}, state[index], toUpdate),
            ...state.slice(index + 1)
        ];
    }

    switch (action.type) {
        case ADDED_GROUP:
            Object.assign(action.group.attributes, DEFAULT_GROUP_STATES.attributes);
            return state.concat(action.group);
        case TOGGLING_RENAME_GROUP:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_renaming: !state[action.index].attributes.is_renaming
                })
            });
        case UPDATING_GROUP:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_updating: true
                })
            });
        case GROUP_RENAMED:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_updating: false,
                    is_renaming: false,
                    title: action.title
                })
            });
        case DOCUMENT_UPLOADED:
            return state.map((group) => {
                if (group.id === action.id) {
                    let { id, type } = action.file;
                    group.relationships.documents.data = group.relationships.documents.data.concat({ id, type });
                }
                return group;
            });
        case GROUP_REMOVED:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case REMOVING_DOCUMENT:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_updating: false
                })
            });
        default: return state;
    }
}
