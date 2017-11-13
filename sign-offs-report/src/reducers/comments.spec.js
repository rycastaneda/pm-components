import { expect } from 'chai';
import { comments } from './comments';
import * as actions from '../constants/ActionTypes';
import mockStaff from '../mocks/staff.json';

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
            staff: mockStaff
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.allIds).to.have.length(mockStaff.data.length);
    });
});
