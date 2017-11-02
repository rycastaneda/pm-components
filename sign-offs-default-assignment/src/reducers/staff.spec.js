import { expect } from 'chai';
import { staff } from './staff';
import * as actions from '../constants/ActionTypes';
import mockSections from '../mocks/sections.json';
import mockStaff from '../mocks/staff.json';

describe('Staff reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = staff(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            needsFetching: true
        });
    });

    it('should handle RECEIVE_SECTIONS and add staff from the sections', function() {
        state = staff(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state.needsFetching).to.be.true;
        expect(state.byId[1]).to.have.property('name');
        expect(state.allIds).to.have.members(
            mockSections.included
                .filter(include => include.type === 'staff')
                .map(staff => staff.id)
        );
    });

    it('should handle RECEIVE_STAFF', function() {
        state = staff(state, {
            type: actions.RECEIVE_STAFF,
            staffs: mockStaff
        });

        expect(state.needsFetching).to.be.false;
        expect(state.byId[1]).to.have.property('total_incomplete_signoff', 5);
        expect(state.byId[1]).to.have.property('name');
        expect(state.byId[1]).to.have.property('user_id');
        expect(state.allIds).to.have.members(
            mockStaff.data.map(staff => staff.id)
        );
    });

    it('should handle ASSIGN_STAFF', () => {
        state = staff(state, {
            type: actions.ASSIGN_STAFF,
            sectionId: 1,
            staffId: 158
        });

        expect(state.byId[158].isLoading).to.be.false;
    });

    it('should handle REMOVE_STAFF', () => {
        state = staff(state, {
            type: actions.REMOVE_STAFF,
            sectionId: 1,
            staffId: 158
        });

        expect(state.byId[158].isLoading).to.be.false;
    });
});
