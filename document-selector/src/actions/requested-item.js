import {
    REQUESTED_ITEMS_FETCHING,
    REQUESTED_ITEMS_RECEIVING,
    REQUESTED_ITEM_TOGGLE,
    SELECT_ITEM
} from '../constants/DocumentSelector';
import axios from 'axios';


export function fetchItems(quote_id, addedItems) {
    return (dispatch) => {
        dispatch({
            type: REQUESTED_ITEMS_FETCHING
        });

        return axios(`searcher-quote-requests/${quote_id}/requested-items`)
            .then((items) => {
                if (items && (items.response && !items.response.ok)) { // error check
                    return;
                }

                return dispatch({ type: REQUESTED_ITEMS_RECEIVING, items: items.data, addedItems });
            });
    };
}

export function toggleItem(document, item, checked, fromGrid) {
    return (dispatch) => {
        const data = Object.assign({}, document, {
            relationships : {
                'requested-items': {
                    data: {
                        type: 'requested-items',
                        id: item.id
                    }
                }
            }
        });

        axios({
            url: `searcher-quote-requests/${document.quote_id}/documents/${document.id}/relationships/requested-items`,
            data: { data },
            method: checked ? 'DELETE' : 'PATCH'
        }).then((response) => {
            dispatch({
                type: REQUESTED_ITEM_TOGGLE,
                item,
                document,
                response,
                fromGrid
            });
        });
    };
}

export function selectItem(item) {
    return (dispatch) => {
        dispatch({
            type: SELECT_ITEM,
            item
        });
    };
}
