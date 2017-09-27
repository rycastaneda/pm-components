import { expect } from 'chai';
import { sections } from './sections';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';

describe('Sections reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = sections(undefined, {});
        expect(state).to.deep.equal({ 
            byId: {},
            allIds: [],
            loading: true
        });
    });

    it('should handle FETCH_SECTIONS', () => {
        state = sections(state, {
            type: actions.FETCH_SECTIONS
        });

        expect(state).to.have.property('loading', true);
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = sections(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state).to.have.property('loading', false);
        expect(state.byId[1]).to.have.property('isCollapsed', false);
        expect(state.byId[1]).to.have.property('isAddingNewComment', false);
        expect(state.byId[1]).to.have.property('currentTab');
        expect(state.byId[1]).to.have.property('status');
        expect(state.byId[1].commentIds).to.have.length(2);
        expect(state.byId[1].answers[0]).to.have.property('questionId', 1);
        expect(state.byId[1].answers[0]).to.have.property('answer', 'Spaghetti');
        expect(state.byId[1].answers).to.have.length(2);
        expect(state.allIds).to.have.members(mockSections.data.map(sections => '' + sections.id));
    });

    it('should handle TOGGLE_SECTION', () => {
        let isCollapsed = state.byId[1].isCollapsed;

        state = sections(state, {
            type: actions.TOGGLE_SECTION,
            sectionId: 1
        });
        
        expect(state.byId[1]).to.have.property('isCollapsed', !isCollapsed);
    });

    it('should handle TOGGLE_STATUS', () => {
        state = sections(state, {
            type: actions.TOGGLE_STATUS,
            sectionId: 1,
            status: 'approved'
        });

        expect(state.byId[1]).to.have.property('status', 'approved');
    });

    it('should handle SWITCH_TAB', () => {
        state = sections(state, {
            type: actions.SWITCH_TAB,
            sectionId: 1,
            currentTab: 'comments'
        });

        expect(state.byId[1]).to.have.property('currentTab', 'comments');
    });

    it('should handle TOGGLE_COMMENT_BOX', () => {
        state = sections(state, {
            type: actions.TOGGLE_COMMENT_BOX,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isAddingNewComment', true);
    });

});