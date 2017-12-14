import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    isLoading: {
        who: 'evaluation',
        id: null,
        done: false
    },
    error: '',
    assignmentId: '',
    currentView: 'single'
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_EVALUATION:
            state.isLoading = {
                who: 'evaluation',
                id: null,
                done: false
            };
            state.assignmentId = action.assignmentId;
            return { ...state };
        case actions.RECEIVE_EVALUATION:
            state.isLoading = {
                who: 'evaluation',
                id: null,
                done: true
            };
            state.error = '';
            return { ...state };
        case actions.REQUEST_ERROR:
            state.error = 'Something went wrong. Please try again later';
            return { ...state };

        case actions.CHANGE_VIEW:
            state.currentView = action.view;
            return { ...state };
    }

    return state;
}
