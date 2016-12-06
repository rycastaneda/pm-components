import { 
    DOCUMENTS_RECEIVING, 
    DOCUMENTS_FETCHING,
    TOGGLE_LOADING
    // DOCUMENTS_SELECT_ALL
} from '../constants/DocumentSelector';
import {
    readEndpoint
} from 'redux-json-api';
import { selectItems } from 'requested-items';


export function fetchDocuments() {
    return (dispatch) => {
        
        dispatch({
            type: DOCUMENTS_FETCHING
        });

        return dispatch(readEndpoint(`document-groups?include=documents`))
            .then((groups) => {
                if (groups && (groups.response && !groups.response.ok)) { // error
                    return;
                }

                return dispatch({ type: DOCUMENTS_RECEIVING, groups });
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



