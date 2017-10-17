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
            isLoading: true
        });
    });

    it('should handle FETCH_SECTIONS', () => {
        state = sections(state, {
            type: actions.FETCH_SECTIONS
        });

        expect(state).to.have.property('isLoading', true);
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = sections(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('isCollapsed', false);
        expect(state.byId[1]).to.have.property('isAddingNewComment', false);
        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('currentTab', 'questions');
        expect(state.byId[1]).to.have.property('isShown', false);
        expect(state.byId[1].responses[1]).to.eql('In Progress');
        expect(state.byId[1].commentIds).to.have.length(2);
        expect(state.byId[1].answers[0]).to.have.property('questionId', 1);
        expect(state.byId[1].answers[0]).to.have.property('answer', 'Spaghetti');
        expect(state.byId[1].answers).to.have.length(2);
        expect(state.allIds).to.have.members(mockSections.data.map(sections => sections.id));
    });

    it('should handle TOGGLE_SECTION_COLLAPSE', () => {
        let isCollapsed = state.byId[1].isCollapsed;

        state = sections(state, {
            type: actions.TOGGLE_SECTION_COLLAPSE,
            sectionId: 1
        });
        
        expect(state.byId[1]).to.have.property('isCollapsed', !isCollapsed);
    });

    it('should handle TOGGLE_MANAGE_SECTION_MODAL', function() {
        let isShown = state.byId[1].isShown;

        state = sections(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });
        
        expect(state.byId[1]).to.have.property('isShown', !isShown);
    });

    it('should handle SWITCH_SECTION_TAB', () => {
        state = sections(state, {
            type: actions.SWITCH_SECTION_TAB,
            sectionId: 1,
            currentTab: 'comments'
        });

        expect(state.byId[1]).to.have.property('currentTab', 'comments');
    });

    it('should handle TOGGLE_COMMENT_BOX toggling adding flag', () => {
        const isAddingNewComment = state.byId[1].isLoading; 

        state = sections(state, {
            type: actions.TOGGLE_COMMENT_BOX,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isAddingNewComment', !isAddingNewComment);
    });

    it('should handle TOGGLE_SECTION_LOADING by toggling loading flag', () => {
        const isLoading = state.byId[1].isLoading; 

        state = sections(state, {
            type: actions.TOGGLE_SECTION_LOADING,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isLoading', !isLoading);
    });

    it('should handle SUBMITTED_NEW_COMMENT by adding the new comment to commentIds', () => {
        state = sections(state, {
            type: actions.SUBMITTED_NEW_COMMENT,
            sectionId: 1,
            commentId: 4,
            comment: 'test',
            date: '10-03-2017 10:55 am'
        });
        
        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('isAddingNewComment', false);
        expect(state.byId[1].commentIds).to.have.members([1, 2, 4]);
    });

    it('should handle DELETED_COMMENT by removing the commentId from commentIds', () => {
        state = sections(state, {
            type: actions.DELETED_COMMENT,
            sectionId: 1,
            commentId: 4
        });
        
        expect(state.byId[1].commentIds).to.not.include(4);
    });

    it('should handle TOGGLE_STAFF_STATUS with staffId and status as payload', function() {
        state = sections(state, {
            type: actions.TOGGLE_STAFF_STATUS,
            sectionId: 1,
            staffId: 1,
            status: 'not approved'
        });

        expect(state.byId[1].responses[1]).to.eql('not approved');
    });

    it('should handle ADDED_STAFF_RESPONSE with staffId and status as payload', function() {
        state = sections(state, {
            type: actions.ADDED_STAFF_RESPONSE,
            sectionId: 1,
            staffId: 5
        });

        expect(state.byId[1].responses[5]).to.eql('Pending');
    });

    it('should handle DELETED_STAFF with staffId and status as payload', function() {
        state = sections(state, {
            type: actions.DELETED_STAFF,
            sectionId: 1,
            staffId: 5
        });

        expect(Object.keys(state.byId[1].responses)).to.not.include(5);
    });

});