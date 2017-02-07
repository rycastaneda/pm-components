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
    action.requirements.included.map((requirement) => {
        state.byId[requirement.attributes.pivot.id] = requirement.attributes;
        state.byId[requirement.attributes.pivot.id].documentIds = [];
        state.byId[requirement.attributes.pivot.id].docsToAdd = [];
        state.allIds.push(requirement.attributes.pivot.id);
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
        if(!document.attributes.requested_document_id) {
            state.byId['additional'].documentIds.push(document.id); 
        }
    });

    return Object.assign({}, state);
}
