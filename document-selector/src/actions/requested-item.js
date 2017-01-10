import { 
    REQUESTED_ITEMS_FETCHING, 
    REQUESTED_ITEMS_RECEIVING,
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';
import axios from 'axios';


export function fetchItems(quote_id, addedItems) {
    return (dispatch) => {
        console.log("quote_id", quote_id, addedItems);
        dispatch({
            type: REQUESTED_ITEMS_FETCHING
        });

        return axios(`searcher-quote-requests/${quote_id}/requested-items`)
            .then((items) => {
                if (items && (items.response && !items.response.ok)) { // error
                    return;
                }

                return dispatch({ type: REQUESTED_ITEMS_RECEIVING, items: items.data, addedItems });
            });
    };
}

export function toggleItem(document, item) {
    return (dispatch) => {
        Object.assign(document, { 
            relationships : {
                'requesteditems': {
                    data: [{
                        type: 'requesteditems',
                        id: item.id
                    }]
                }
            }
        });
        console.log("document, item", document, item);

        axios({
            url: `${document.type}/${document.id}/relationships/requesteditems`, 
            data: { data: document },
            method: item.attributes.checked ? 'DELETE' : 'PATCH'
        }).then((response) => {
            console.log("REQUESTED_ITEM_TOGGLE", REQUESTED_ITEM_TOGGLE);

            dispatch({
                type: REQUESTED_ITEM_TOGGLE,
                item,
                document,
                response
            });
        });
    };
}




