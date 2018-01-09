import { expect } from 'chai';
import { comments } from './comments';
import * as actions from '../constants';
import mockComments from '../mocks/comments.json';

describe('Comments reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = comments(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            isLoading: false
        });
    });

    it('should handle FETCH_COMMENT', () => {
        state = comments(state, {
            type: actions.FETCH_COMMENT
        });

        expect(state).to.have.property('isLoading', true);
    });

    it('should handle RECEIVE_COMMENT', () => {
        state = comments(state, {
            type: actions.RECEIVE_COMMENT,
            comments: mockComments
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.allIds).to.have.length(mockComments.data.length);
    });
});
