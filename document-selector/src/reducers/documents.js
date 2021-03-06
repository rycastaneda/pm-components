// globals Plantminer
import {
    DOCUMENTS_RECEIVING,
    DOCUMENT_TOGGLE,
    GROUP_TOGGLE,
    SELECT_ITEM,
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';
import { normalizeObject } from '../utility/utils';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documents(state = INITIAL_STATE, action) {
    let normalized = {}, index;

    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            normalized = normalizeObject(action.response.data, function(relationships) {
                relationships['saveditems'] = relationships['requesteditems'];
                return relationships;
            });

            return Object.assign({}, state, {
                byId: normalized,
                allIds: Object.keys(normalized)
            });
        case DOCUMENT_TOGGLE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.document.id]: {
                        ...state.byId[action.document.id],
                        requesteditems: action.document.requesteditems && action.document.requesteditems.length
                        ? []
                        : action.items, // toggle requested items with all item ids
                        saveditems: action.document.requesteditems && action.document.requesteditems.length
                        ? []
                        : action.items
                    }
                }
            };
        case GROUP_TOGGLE:
            action.group.documents.map((document) => {
                state.byId[document.id].requesteditems = action.checked ? [] : action.items; // add requested items to relationships
            });

            return {
                ...state
            };
        case REQUESTED_ITEM_TOGGLE:
            if (action.fromGrid) {
                index = action.document.saveditems.indexOf(action.item.id);
                if (index < 0) {
                    action.document.saveditems.push(action.item.id);
                } else {
                    action.document.saveditems.splice(index, 1);
                }
            } else {
                index = action.document.requesteditems.indexOf(action.item.id);

                if (index < 0) {
                    action.document.requesteditems.push(action.item.id);
                    index = action.document.saveditems.indexOf(action.item.id);
                } else {
                    action.document.requesteditems.splice(index, 1);
                }
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.document.id]: {
                        ...state.byId[action.document.id],
                        requesteditems: action.document.requesteditems,
                        saveditems: action.document.saveditems // toggle requested item
                    }
                }

            };

        case SELECT_ITEM:
            state.allIds.map((id) => {
                if (action.item.value === 'all') {
                    state.byId[id].requesteditems = action.requestedItems;
                    return;
                }

                if (action.item.value === 'none') {
                    state.byId[id].requesteditems = [];
                    return;
                }

                if (!state.byId[id].saveditems.includes(action.item.value)) {
                    state.byId[id].requesteditems = [];
                } else {
                    state.byId[id].requesteditems = state.byId[id].saveditems;
                }

            });

            return { ...state };
        default:
            return state;
    }
}
