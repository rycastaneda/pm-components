import { 
    REQUESTED_ITEMS_RECEIVING,
    DOCUMENTS_RECEIVING
} from '../constants/DocumentSelector';
import { normalizeObject } from '../utility/utils';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

export function requestedItems(state = INITIAL_STATE, action) {
    let items = {}; 
    let allIds = [], normalized = {};
    switch (action.type) {
        case DOCUMENTS_RECEIVING: 
            if (action.response.data.length) {
                action.response.included.map((include) => { // get all items from the documents endpoint 
                    if (include.type === 'requesteditems') {
                        Object.assign(items, {
                            [include.id]: include.attributes
                        });
                        allIds.push(include.id);
                    }
                });
            }
            
            Plantminer.documents = allIds;
            return {
                byId: items,
                allIds
            };
        case REQUESTED_ITEMS_RECEIVING:
            normalized = normalizeObject(action.items.data); // Replace all items with its own designated endpoint

            return Object.assign({}, state, {
                byId: normalized,
                allIds: Object.keys(normalized)
            });
        default:
            return state;
    }
}


