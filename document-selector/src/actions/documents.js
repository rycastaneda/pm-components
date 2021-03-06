import {
    DOCUMENTS_RECEIVING,
    DOCUMENTS_FETCHING,
    DOCUMENT_TOGGLE,
    GROUP_TOGGLE,
    SELECT_ITEM,
    TOGGLE_LOADING
} from '../constants/DocumentSelector';
import { selectItems, fetchItems } from './requested-item';
import axios from 'axios';

export function fetchDocuments(quote_id, requested_item_id) {
    return (dispatch) => {

        dispatch({
            type: DOCUMENTS_FETCHING
        });

        return axios.get(`searcher-quote-requests/${quote_id}/documents?include=requesteditems,groups`)
            .then((response) => {
                if (response && (response.response && !response.response.ok)) { // error
                    return;
                }

                // call endpoint to requested items if mode is not allItems
                dispatch(fetchItems(quote_id, response.data.included));

                return dispatch({
                    type: DOCUMENTS_RECEIVING,
                    response: response.data
                });
            }).then(() => {
                return dispatch({
                    type: SELECT_ITEM,
                    item: {
                        label: '',
                        value: `${requested_item_id}`
                    }
                });
            });
    };
}

export function toggleDocument(document) {
    return (dispatch, getState) => {
        dispatch({
            type: DOCUMENT_TOGGLE,
            document,
            items: getState().requestedItems.allIds
        });
    };
}

export function toggleGroup(group, checked) {
    return (dispatch, getState) => {
        dispatch({
            type: GROUP_TOGGLE,
            items: getState().requestedItems.allIds,
            group,
            checked
        });
    };
}

export function selectAllDocuments() {
    return (dispatch, getState) => {
        const items = getState().requested_items.map((item) => {
            return {
                type: item.type,
                id: item.id
            };
        });

        dispatch({
            type: TOGGLE_LOADING
        });

        Promise.all(getState().documents.map((document) => {
            return selectItems(document, items);
        }));
    };
}
