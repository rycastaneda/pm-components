import * as actions from '../constants/ActionTypes';

const INITIAL_STATE = {
    isLoading: {
        who: 'evaluation',
        id: null,
        done: false
    },
    evaluationId: '',
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
            state.evaluationId = action.evaluationId;
            return { ...state };
        case actions.RECEIVE_EVALUATION:
            state.isLoading = {
                who: 'evaluation',
                id: null,
                done: true
            };
            return { ...state };
        // case actions.FETCH_CRITERIA:
        //     state.isLoading = {
        //         who: 'criteria',
        //         id: null,
        //         done: false
        //     };
        //     return { ...state };
        // case actions.RECEIVE_CRITERIA:
        //     state.isLoading = {
        //         who: 'criteria',
        //         id: null,
        //         done: true
        //     };
        //     return { ...state };
        // case actions.FETCH_QUESTION_DETAILS:
        //     state.isLoading = {
        //         who: 'criterion',
        //         id: action.questionId,
        //         done: false
        //     };
        //     return { ...state };
        // case actions.RECEIVE_QUESTION_DETAILS:
        //     state.isLoading = {
        //         who: 'criterion',
        //         id: action.questionId,
        //         done: true
        //     };
        //     return { ...state };
        case actions.CHANGE_VIEW:
            state.currentView = action.view;
            return { ...state };
    }

    return state;
}
