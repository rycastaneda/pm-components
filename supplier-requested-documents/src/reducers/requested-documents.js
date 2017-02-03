import {
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    DOCUMENT_REMOVING,
    DOCUMENT_UPLOAD_SUCCESS
} from '../constants';

const INITIAL_STATE = {
    byId: {}, // array of document groups
    allIds: []
};

export function requirementsDocuments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_REQUIREMENTS: return receiveRequirements(state, action);
        case DOCUMENTS_RECEIVING: return receiveDocument(state, action);
        case DOCUMENT_REMOVING: return removeDocument(state, action);
        default:
            return state;
    }
}

function receiveRequirements(state, action) {
    action.requirements.data.map((requirement) => {
        state.byId[requirement.id] = requirement.attributes;
        state.byId[requirement.id].docsToAdd = [];
        state.allIds.push(requirement.id);
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