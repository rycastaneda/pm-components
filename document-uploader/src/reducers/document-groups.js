import {
    API_READ_FAILED,
    GROUPS_LOADING,
    GROUPS_RECEIVING,
    GROUPS_RECEIVING_DEFAULTS,
    GROUP_ADDED,
    GROUP_RENAME_TOGGLE,
    GROUP_TOGGLE_UPDATING,
    GROUP_UPDATE_FAILED,
    GROUP_REMOVED,
    GROUP_RENAMED,
    GROUPS_DOWNLOAD_STARTED, 
    GROUPS_DOWNLOADED,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_REMOVED
} from '../constants/ActionTypes';
import { uniq } from 'lodash'; 

const INITIAL_STATE = {
    data: [], // array of document groups
    defaults: [],
    loading: false,
    downloading: false
};

const DEFAULT_ERROR = 'Request failed. Please try again later.';

const DEFAULT_GROUP_STATES = {
    attributes: {
        is_updating: false,
        is_renaming: false,
        errors: []
    }
};

export function documentGroups(state = INITIAL_STATE, action) {
    let defaults;

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
            defaults = uniq(action.groups.data, group => group.attributes.title);
            return Object.assign({}, state, {
                loading: false,
                data: action.groups.data.filter(group => group.attributes.user_id),
                defaults: state.defaults.concat(defaults)
            });
        case GROUPS_RECEIVING_DEFAULTS: 
            return Object.assign({}, state, {
                loading: false,
                defaults: state.defaults.concat(action.defaults.data)
            });
        case GROUP_ADDED:
            return Object.assign({}, state, {
                loading: false,
                defaults: state.defaults.concat(action.group.data),
                data: groups(state.data, action)
            });
        case GROUPS_DOWNLOAD_STARTED: 
            return Object.assign({}, state, {
                downloading: true
            });
        case GROUPS_DOWNLOADED: 
            return Object.assign({}, state, {
                downloading: false
            });
        case GROUP_REMOVED:
        case GROUP_TOGGLE_UPDATING:
        case GROUP_UPDATE_FAILED:
        case GROUP_RENAMED:
        case GROUP_RENAME_TOGGLE:
        case DOCUMENT_REMOVED:
            defaults = state.defaults.map((def) => {
                if (def.id  === action.id) {
                    def.attributes.user_id = null;
                }

                return def;
            });

            return Object.assign({}, state, {
                loading: false,
                data: groups(state.data, action),
                defaults
            });
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
            Object.assign(action.group.data.attributes, DEFAULT_GROUP_STATES.attributes);
            return state.concat(action.group.data);
        case GROUP_RENAME_TOGGLE:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_renaming: !state[action.index].attributes.is_renaming
                })
            });
        case GROUP_TOGGLE_UPDATING:
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    is_updating: action.loading
                })
            });
        case GROUP_UPDATE_FAILED: 
            return updatingGroup({
                attributes: Object.assign({}, state[action.index].attributes, {
                    errors: action.errors
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
                    
                    if (!group.relationships.documents) { // add documents to relationship if does not exists
                        group.relationships.documents = {
                            data: []
                        };
                    }

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
