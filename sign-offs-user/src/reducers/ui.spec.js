import { expect } from 'chai';
import { ui } from './ui';
import * as actions from '../constants';

describe('UI reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = ui(undefined, {});
        expect(state).to.deep.equal({
            isReadOnly: true,
            currentStaffId: 0,
            error: null,
            preferredSupplierId: null,
            supplierUserId: null,
            panelId: null
        });
    });

    it('should handle FETCH_SECTIONS by setting read-only variable and getting current staff id', () => {
        state = ui(state, {
            type: actions.FETCH_SECTIONS,
            isReadOnly: false,
            staffId: 100,
            preferredSupplierId: 51,
            supplierUserId: 7803,
            panelId: 2
        });

        expect(state).to.have.property('isReadOnly', false);
        expect(state).to.have.property('currentStaffId', 100);
        expect(state).to.have.property('preferredSupplierId', 51);
        expect(state).to.have.property('supplierUserId', 7803);
        expect(state).to.have.property('panelId', 2);
    });

    it('should handle API_ERROR setting the error message', () => {
        state = ui(state, {
            type: actions.API_ERROR,
            error: 'Something went wrong. Please try again later'
        });

        expect(state).to.have.property(
            'error',
            'Something went wrong. Please try again later'
        );
    });
});
