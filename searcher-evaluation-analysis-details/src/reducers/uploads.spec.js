import { expect } from 'chai';
import { uploads } from './uploads';
import * as actions from '../constants/ActionTypes';
import mockEvaluation from '../mocks/evaluation';

describe('UI reducer', () => {
    let state = {};
    let commentIds = mockEvaluation.included
        .filter(include => include.type === 'uploads')
        .map(upload => upload.id);

    it('should handle default state', () => {
        state = uploads(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = uploads(state, {
            type: actions.RECEIVE_EVALUATION,
            evaluation: mockEvaluation
        });

        expect(state.allIds).to.deep.equal(commentIds);
        commentIds.map(commentId => {
            expect(state.byId[commentId]).to.be.an('object');
        });
    });
});
