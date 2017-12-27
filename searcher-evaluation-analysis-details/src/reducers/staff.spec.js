import { expect } from 'chai';
import { staff } from './staff';
// import * as actions from '../constants/ActionTypes';

describe('Staff reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = staff(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });
});
