import { 
    DOCUMENTS_RECEIVING
} from '../constants/DocumentSelector';

const INITIAL_STATE = {
    byId: {},
    allIds: []
};

export function groups(state = INITIAL_STATE, action) {
    let allIds = [];
    let groups = {};

    switch (action.type) {
        case DOCUMENTS_RECEIVING:
            action.response.included.map((include) => {
                if (include.type === 'document-group') {
                    Object.assign(groups, {
                        [include.id]: include.attributes
                    });
                    allIds.push(include.id);
                }
            });

            return Object.assign({}, state, {
                byId: groups,
                allIds
            });
        default:
            return state;
    }
}