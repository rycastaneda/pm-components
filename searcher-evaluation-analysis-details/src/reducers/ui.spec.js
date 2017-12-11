import { expect } from 'chai';
import { ui } from './ui';
import * as actions from '../constants/ActionTypes';

describe('UI reducer', () => {
    let state = {};
    const assignmentId = 1;

    it('should handle default state', () => {
        state = ui(undefined, {});
        expect(state).to.deep.equal({
            isLoading: {
                who: 'evaluation',
                id: null,
                done: false
            },
            assignmentId: '',
            currentView: 'single'
        });
    });

    it('should handle FETCH_EVALUATION', () => {
        state = ui(state, {
            type: actions.FETCH_EVALUATION,
            assignmentId
        });

        expect(state.isLoading).to.deep.equal({
            who: 'evaluation',
            id: null,
            done: false
        });
        expect(state.assignmentId).to.eql(assignmentId);
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = ui(state, {
            type: actions.RECEIVE_EVALUATION,
            assignmentId
        });

        expect(state.isLoading).to.deep.equal({
            who: 'evaluation',
            id: null,
            done: true
        });
    });

    it('should handle FETCH_CRITERIA', () => {
        state = ui(state, {
            type: actions.RECEIVE_EVALUATION,
            assignmentId
        });

        expect(state.isLoading).to.deep.equal({
            who: 'evaluation',
            id: null,
            done: true
        });
    });
});
