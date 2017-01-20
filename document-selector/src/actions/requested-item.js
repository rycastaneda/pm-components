import { 
    REQUESTED_ITEMS_FETCHING, 
    REQUESTED_ITEMS_RECEIVING,
    REQUESTED_ITEM_TOGGLE,
    OPEN_COPY_MODAL,
    CLOSE_COPY_MODAL,
    SELECT_ITEM,
    COPY_ITEM
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

export function toggleItem(document, item, checked) {
    return (dispatch) => {
        const data = Object.assign({}, document, { 
            relationships : {
                'requesteditems': {
                    data: [{
                        type: 'requesteditems',
                        id: item.id
                    }]
                }
            }
        });

        axios({
            url: `searcher-quote-requests/${document.quote_id}/documents/${document.id}/relationships/requesteditems`, 
            data: { data },
            method: checked ? 'DELETE' : 'PATCH'
        }).then((response) => {
            dispatch({
                type: REQUESTED_ITEM_TOGGLE,
                item,
                document,
                response
            });
        });
    };
}


export function openItemModal() {
    return (dispatch) => {
        dispatch({
            type: OPEN_COPY_MODAL
        });
    };
}

export function closeItemModal() {
    return (dispatch) => {
        dispatch({
            type: CLOSE_COPY_MODAL
        });
    };
}

export function copyItem(item) {
    return (dispatch) => {
        dispatch({
            type: COPY_ITEM,
            item
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