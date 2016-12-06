import { 
    REQUESTED_ITEMS_FETCHING, 
    REQUESTED_ITEMS_RECEIVING
    REQUESTED_ITEM_TOGGLE
} from '../constants/DocumentSelector';
import {
    updateEntity,
    readEndpoint
} from 'redux-json-api';


export function fetchItems() {
    return (dispatch) => {
        
        dispatch({
            type: REQUESTED_ITEMS_FETCHING
        });

        return dispatch(readEndpoint(`searcher-quote-requests/requested-items`))
            .then((items) => {
                if (items && (items.response && !items.response.ok)) { // error
                    return;
                }

                return dispatch({ type: REQUESTED_ITEMS_RECEIVING, items });
            });
    };
}

export function selectItem(document, items) {
    return (dispatch) => {
        document.relationships.requested_items.data = items;

        return dispatch(updateEntity(document)).then((response) => {
            console.log("response", response);
            dispatch({
                type: REQUESTED_ITEM_TOGGLE,
                item: response
            })

        });
    };
}




