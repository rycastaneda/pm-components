import {
    RECEIVE_REQUIREMENTS,
    TOGGLE_REVISIONS
} from '../constants';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function documents(state = INITIAL_STATE, action) {

    switch (action.type) {
        case RECEIVE_REQUIREMENTS:
            action.documents.data.map((doc) => {
                let included = doc.relationships.requesteditems.data.map(item => item.id);
                let revisionIds = doc.relationships.revisions.data.map(revision => revision.id);

                state.byId[doc.id] = Object.assign({}, doc.attributes, {
                    id: doc.id,
                    showRevisions: false,
                    included,
                    revisionIds
                });

                state.allIds.push(doc.id);
            });


            action.documents.included.map((doc) => {
                if (doc.type !== 'quote-document-revision') {
                    return;
                }

                state.byId[doc.id] = Object.assign({}, doc.attributes, {
                    id: doc.id
                });

                state.allIds.push(doc.id);
            //         state.byId[document.id].included.push(requirement.id);
            //     });
            });

            return Object.assign({}, state);
        case TOGGLE_REVISIONS:
            state.byId[action.documentId].showRevisions = !state.byId[action.documentId].showRevisions;

            return Object.assign({}, state);
        default:
            return state;
    }
}
