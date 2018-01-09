import { expect } from 'chai';
import { staff } from './staff';
import * as actions from '../constants';
import mockStaff from '../mocks/staff.json';

describe('Staff reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = staff(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            isLoading: false
        });
    });

    it('should handle FETCH_STAFF', () => {
        state = staff(state, {
            type: actions.FETCH_STAFF
        });

        expect(state).to.have.property('isLoading', true);
    });

    it('should handle RECEIVE_STAFF', () => {
        state = staff(state, {
            type: actions.RECEIVE_STAFF,
            staff: mockStaff
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.allIds).to.have.length(mockStaff.data.length);
    });
});
