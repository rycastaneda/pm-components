// globals Plantminer
import { 
    DOCUMENTS_RECEIVING,
    DOCUMENT_TOGGLE,
    GROUP_TOGGLE,
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';
import { normalizeObject, saveDocument } from '../utility/utils';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documents(state = INITIAL_STATE, action) {
    let normalized = {}, index;

    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            normalized = normalizeObject(action.response.data);
            Plantminer.documents = Object.keys(normalized);

            return Object.assign({}, state, {
                byId: normalized,
                allIds: Object.keys(normalized)
            });
        case DOCUMENT_TOGGLE: 
            saveDocument(action.document);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.document.id]: {
                        ...state.byId[action.document.id],
                        requesteditems: action.document.requesteditems && action.document.requesteditems.length ? []: action.items // toggle requested items with all item ids
                    }
                }
            };
        case GROUP_TOGGLE: 
            action.group.documents.map((document) => {
                saveDocument(document);
                state.byId[document.id].requesteditems = action.checked ? [] : action.items; // add requested items to relationships
            });

            return {
                ...state
            };
        case REQUESTED_ITEM_TOGGLE: 
            index = action.document.requesteditems.indexOf(action.item.id);

            if (index < 0) {
                action.document.requesteditems.push(action.item.id);
            } else {
                action.document.requesteditems.splice(index, 1);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.document.id]: {
                        ...state.byId[action.document.id],
                        requesteditems: action.document.requesteditems // toggle requested item
                    }
                }

            };
        default:
            return state;
    }
}

