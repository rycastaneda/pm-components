// globals Plantminer
import { 
    DOCUMENTS_FETCHING, 
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


function toggleItemArray(array, toggle) {
    console.log("array.length", array.length, toggle);
    let index = array.findIndex((element) => {
        return element.id === toggle.id;
    });
    console.log("index", index);
    // if (index < 0) {
    //     array.push(toggle);
    // } else {
    //     array.splice(index, 1);
    // }
    // console.log("array", array);
    // return array;
}

export function documents(state = INITIAL_STATE, action) {
    let documentIds = [];

    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            documentIds = Object.keys(normalizeObject(action.response.data));

            return Object.assign({}, state, {
                byId: normalizeObject(action.response.data),
                allIds: documentIds
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
                console.log("document.id", document.id);
                console.log("state.byId[document.id]", state.byId[document.id]);
                saveDocument(document);
                state.byId[document.id].requesteditems = action.checked ? [] : action.items;
                console.log("state", state);
            });

            return {
                ...state
            };

            // return Object.assign({}, state, {
            //     data: state.data.map((document) => {
            //         if (document.relationships.groups.data.id === action.group.id) {
            //             if (action.checked) {
            //                 document.relationships.requesteditems.data = [];
            //                 Plantminer.documents = [];
            //             } else {
            //                 let index = Plantminer.documents.indexOf(document.id);
            //                 if (index < 0) {
            //                     Plantminer.documents.push(document.id);
            //                 }
            //                 document.relationships.requesteditems.data.push({});
            //             }
            //         }
            //         return document;
            //     })
            // });
        case REQUESTED_ITEM_TOGGLE: 
            console.log("state", state);
            return Object.assign({}, state, { 
                data: state.data.map((document) => {
                    console.log("action", action, document);
                    if (document.id === action.document.id) {
                        console.log("document.relationships.requesteditems.data", document.relationships.requesteditems.data);

                        document.relationships.requesteditems.data = toggleItemArray(document.relationships.requesteditems.data, action.item);
                    }
                    return document;
                })
            });
        default:
            return state;
    }
}

