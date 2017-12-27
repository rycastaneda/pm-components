import { expect } from 'chai';
import { comments } from './comments';
import mockEvaluation from '../mocks/evaluation.json';
import * as actions from '../constants/ActionTypes';

describe('Comments reducer', () => {
    let state = {};
    let commentIds = mockEvaluation.included
        .filter(include => include.type === 'evaluation-question-responses')
        .map(response => response.id);

    it('should handle default state', () => {
        state = comments(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = comments(undefined, {
            type: actions.RECEIVE_EVALUATION,
            evaluation: mockEvaluation
        });

        expect(state.allIds).to.deep.equal(commentIds);
        commentIds.map(commentId => {
            expect(state.byId[commentId]).to.be.an('object');
        });
    });
});
