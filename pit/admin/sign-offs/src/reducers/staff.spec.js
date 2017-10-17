import { expect } from 'chai';
import { staff } from './staff';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';
import mockStaffs from '../mocks/staff.json';
import format from 'date-fns/format';
import { union } from 'lodash';

describe('Staff reducer', () => {
    let state = {};
    
    it('should handle default state', () => {
        state = staff(undefined, {});
        expect(state).to.deep.equal({ 
            byId: {},
            allIds: [],
            needsFetching: true,
            isLoading: false
        });
    });

    it('should handle RECEIVE_SECTIONS', function() {

        state = staff(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state.allIds).to.have.members(
            mockSections.included.filter(include => include.type === 'staff').map(staff => staff.id)
        );

        expect(state.byId[1]).to.have.property('isLoading', false);
    });

    it('should handle SUBMITTED_NEW_COMMENT by adding a new entry', () => { 
        let length = state.allIds.length;
        state = staff(state, {
            type: actions.SUBMITTED_NEW_COMMENT,
            commentId: null,
            staffId: 100,
            staffName: 'Tester',
            comment: 'test',
            date: format(new Date(), 'MM-DD-YYYY HH:m a')
        });

        expect(state.byId).to.have.property(100);
        expect(state.allIds).to.have.length(length + 1); // new supplier got added
    });


    it('should handle TOGGLE_MANAGE_SECTION_MODAL_LOADING with staffId as payload', function() {
        const isLoading = state.isLoading;

        state = staff(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING
        });

        expect(state.isLoading).to.be.eql(!isLoading);
    });

    it('should handle RECEIVE_STAFF', function() {
        const oldIds = state.allIds;

        state = staff(state, {
            type: actions.RECEIVE_STAFF,
            staffs: mockStaffs
        });

        const allIds = union(oldIds, mockStaffs.data.map(staff => staff.id));

        expect(state.needsFetching).to.be.false;
        expect(state.allIds).to.have.members(allIds); // staff get appended
    });

    it('should handle TOGGLE_STAFF_LOADING with staffId as payload', function() {
        const isLoading = state.byId[1].isLoading;

        state = staff(state, {
            type: actions.TOGGLE_STAFF_LOADING,
            staffId: 1
        });

        expect(state.byId[1]).to.have.property('isLoading', !isLoading);
    });

    it('should handle ADDED_STAFF', function() {
        state = staff(state, {
            sectionId: 1,
            staffId: 5
        });

        expect(state.byId[5]).to.be.not.undefined;
        expect(state.allIds).to.include(5);
    });

});