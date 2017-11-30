import { expect } from 'chai';
import { comments } from './comments';
// import * as actions from '../constants/ActionTypes';

describe('Staff reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = comments(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });
});
