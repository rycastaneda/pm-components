import { IS_EDITING, IS_DELETED } from '../constants/ActionTypes';

const testItems = [
    {
        id: 1,
        isEditing: false,
        attributes: {}

    }, {
        id: 2,
        isEditing: false,
        attributes: {}
    }
];

// const INITIAL_STATE = { items: items };

export function quoteRequirements(state = { items: testItems }, action) {
    console.log(action);
    switch (action.type) {
        case IS_DELETED:
        case IS_EDITING:
            return Object.assign({}, state, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

function items(state = testItems, action) {
    switch (action.type) {
        case IS_DELETED:
            return state.map((item, index) => {
                if (item.id !== action.id) {
                    return state;
                }
                console.log(item + '  ' + index);

                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            });
        case IS_EDITING:
            return state.map((item) => {
                if (item.id !== action.id) {
                    return state;
                }

                return Object.assign({}, item, {
                    isEditing: !item.isEditing
                });
            });
        default:
            return state;
    }

}