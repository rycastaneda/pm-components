import { 
    REQUESTED_ITEMS_FETCHING, 
    REQUESTED_ITEMS_RECEIVING,
    DOCUMENTS_RECEIVING,
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';
import { findIndex } from 'lodash';

const INITIAL_STATE = { 
    byId: {},
    allIds: []
};

function toggleItemArray(array, toggle) {
    console.log("array.length", array.length, toggle);
    let index = array.findIndex((element) => {
        return element.id === toggle.id;
    });
    console.log("index", index);
    if (index < 0) {
        array.push(toggle);
    } else {
        array.splice(index, 1);
    }
    console.log("array", array);
    return array;
}

export function requestedItems(state = INITIAL_STATE, action) {
    let items = {}; 
    let allIds = [];
    switch (action.type) {
        case DOCUMENTS_RECEIVING: 
            action.response.included.map((include) => {
                if (include.type === 'requesteditems') {
                    Object.assign(items, {
                        [include.id]: include.attributes
                    });
                    allIds.push(include.id);
                }
            });

            return {
                byId: items,
                allIds
            };
        case REQUESTED_ITEMS_RECEIVING:
            items = action.items.map((item) => {
                item.attributes.included = false;

                if (action.addedItems && findIndex(action.addedItems, { id: item.id })) {
                    item.attributes.included = true;
                }
                return item;
            });

            return Object.assign({}, state, {
                loading: false,
                data: items
            });
        default:
            return state;
    }
}


