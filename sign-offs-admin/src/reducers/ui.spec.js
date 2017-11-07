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
            sectionModalId: null,
            organizationId: null,
            preferredSupplierId: null,
            supplierUserId: null
        });
    });

    it('should handle FETCH_SECTIONS by setting read-only variable and getting current staff id', () => {
        state = ui(state, {
            type: actions.FETCH_SECTIONS,
            isReadOnly: false,
            currentStaffId: 31,
            organizationId: 1,
            preferredSupplierId: 57,
            supplierUserId: 7803
        });

        expect(state).to.have.property('isReadOnly', false);
        expect(state).to.have.property('currentStaffId', 31);
        expect(state).to.have.property('organizationId', 1);
        expect(state).to.have.property('preferredSupplierId', 57);
        expect(state).to.have.property('supplierUserId', 7803);
    });

    it('should handle TOGGLE_MANAGE_SECTION_MODAL by setting the sectionId on edit', function() {
        state = ui(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });

        expect(state).to.have.property('sectionModalId', 1);
    });

    it('should handle TOGGLE_MANAGE_SECTION_MODAL by setting the sectionId on null if same action is committed', function() {
        state = ui(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });

        expect(state).to.have.property('sectionModalId', null);
    });
});
