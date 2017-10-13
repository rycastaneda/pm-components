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
            sectionModalId: null
        });
    });

    it('should handle FETCH_SECTIONS by setting read-only variable and getting current staff id', () => {
        state = ui(state, {
            type: actions.FETCH_SECTIONS,
            isReadOnly: false,
            staffId: 100
        });

        expect(state).to.have.property('isReadOnly', false);
        expect(state).to.have.property('currentStaffId', 100);
    });

    it('should handle TOGGLE_MANAGE_SECTION_MODAL', () => {
        state = ui(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });
        
        expect(state).to.have.property('sectionModalId', 1);

        state = ui(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });
        
        expect(state).to.have.property('sectionModalId', null);
    });

});