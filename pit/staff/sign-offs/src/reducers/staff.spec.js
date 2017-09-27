import { expect } from 'chai';
import { staff } from './staff';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';

describe('Staff reducer', () => {
    let state = {};
    
    it('should handle default state', () => {
        state = staff(undefined, {});
        expect(state).to.deep.equal({ 
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_SECTIONS', function() {

        state = staff(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state.allIds).to.have.members(
            mockSections.included.filter(include => include.type === 'staff').map(staff => '' + staff.id)
        );
    });

});