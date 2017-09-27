import { expect } from 'chai';
import { questions } from './questions';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';

describe('Questions reducer', () => {
    let state = {};
    
    it('should handle default state', () => {
        state = questions(undefined, {});
        expect(state).to.deep.equal({ 
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = questions(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });
        expect(state.allIds).to.have.members(
            mockSections.included.filter(include => include.type === 'question').map(questions => '' + questions.id)
        );
    });

});