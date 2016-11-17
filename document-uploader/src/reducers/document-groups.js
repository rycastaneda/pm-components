import {
    API_READ_FAILED,
    GROUPS_LOADING,
    GROUPS_RECEIVING,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_UPDATING,
    GROUP_REMOVED,
    GROUP_RENAMED,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_REMOVED
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    data: [], // array of document groups
    defaults: [],
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
        case GROUPS_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        case GROUPS_RECEIVING:
            // ADD DEFAULT GROUP STATES
            const data = action.groups.data.filter((group) => {
                if (group.attributes.user_id) {
                    Object.assign(group.attributes, DEFAULT_GROUP_STATES.attributes);
                    return group;
                }
            });

            const defaults = action.groups.data.filter((group) => {
                if (!group.attributes.user_id && !data.find(data => group.attributes.title === data.attributes.title)) {
                    Object.assign(group.attributes, DEFAULT_GROUP_STATES.attributes);
                    return group;
                }
            });

            return Object.assign({}, state, {
                loading: false,
                defaults,
                data
            });
        case GROUP_ADDED:
            state.defaults = state.defaults.filter(group => group.attributes.title !== action.group.attributes.title);
            return Object.assign({}, state, {
                loading: false,
                data: groups(state.data, action)
            });
        case GROUP_REMOVED:
        case GROUP_UPDATING:
        case GROUP_RENAMED:
        case GROUP_RENAME_TOGGLE:
        case DOCUMENT_REMOVED:
        case DOCUMENT_UPLOAD_SUCCESS:
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
        case GROUP_ADDED:
            Object.assign(action.group.attributes, DEFAULT_GROUP_STATES.attributes);
            return state.concat(action.group);
        case GROUP_RENAME_TOGGLE:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_renaming: !state[action.index].attributes.is_renaming
                })
            });
        case GROUP_UPDATING:
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
        case GROUP_REMOVED:
            return state.filter((group) => {
                return group.id !== action.id;
            });
        case DOCUMENT_UPLOAD_SUCCESS:
            return state.map((group) => {
                if (group.id === action.id) {
                    let { id, type } = action.file;
                    group.relationships.documents.data = group.relationships.documents.data.concat({ id, type });
                }
                return group;
            });
        case DOCUMENT_REMOVED:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_updating: false
                })
            });
        default: return state;
    }
}
