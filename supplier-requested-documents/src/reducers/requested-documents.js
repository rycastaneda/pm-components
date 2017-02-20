import {
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    RECEIVE_DOC_REQUIREMENTS,
    DOCUMENT_REMOVING
} from '../constants';

const INITIAL_STATE = {
    byId: {
        additional: {
            title: 'Additional Documents',
            documentIds: [],
            docsToAdd: []
        }
    }, // array of document groups
    allIds: ['additional']
};

export function requirementsDocuments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_REQUIREMENTS: return receiveRequirements(state, action);
        case DOCUMENTS_RECEIVING: return receiveDocument(state, action);
        case DOCUMENT_REMOVING: return removeDocument(state, action);
        case RECEIVE_DOC_REQUIREMENTS: return receiveDocRequirements(state, action);
        default:
            return state;
    }
}

function receiveRequirements(state, action) {
    action.requirements.included && action.requirements.included.map((requirement) => {
        let id = requirement.attributes.pivot.id;

        state.byId[id] = requirement.attributes;
        state.byId[id].documentIds = [];
        state.byId[id].docsToAdd = [];
        state.allIds.push(id);
    });

    return Object.assign({}, state);
}

function receiveDocument(state, action) {
    const { docsToBeAdded, requirementId } = action;
    const requirement = state.byId[requirementId];
    const docsToAdd = docsToBeAdded.map(doc => doc.id);

    return {
        ...state,
        byId: {
            ...state.byId,
            [requirementId]: {
                ...requirement,
                documentIds: requirement.documentIds.concat(docsToAdd)
            }
        }
    };
}

function removeDocument(state, action) {
    const { requirementId, docId } = action;

    const requirement = state.byId[requirementId];

    const index = requirement.documentIds.indexOf(docId);

    if (index > -1) {
        requirement.documentIds.splice(index, 1);
    }

    return Object.assign({}, state);
}

function receiveDocRequirements(state, action) {
    action.documents.data.map((document) => {
        state.byId[document.attributes.requested_document_id || 'additional'].documentIds.push(document.id); 
    });

    return Object.assign({}, state);
}
