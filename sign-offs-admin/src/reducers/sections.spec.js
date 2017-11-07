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
        expect(state.byId[1]).to.have.property('defaultUserIds');
        expect(state.byId[1]).to.have.property('responseIds');
        expect(state.byId[1]).to.have.property('commentIds');
        expect(state.byId[1]).to.have.property('isShown', false);
        expect(state.byId[46].defaultUserIds).to.have.members(['1']);
        expect(state.byId[47].responseIds).to.have.members(['1']);
        expect(state.byId[47].commentIds).to.have.members(['1', '2']);
        expect(state.allIds).to.have.members(
            mockSections.data.map(sections => '' + sections.id)
        );
    });

    it('should handle RECEIVE_QUESTIONS', () => {
        state = sections(state, {
            type: actions.RECEIVE_QUESTIONS,
            sectionId: 1
        });
        expect(state.byId[1]).to.have.property('isLoading', false);
    });

    it('should handle TOGGLE_MANAGE_SECTION_MODAL', () => {
        let isShown = state.byId[1].isShown;

        state = sections(state, {
            type: actions.TOGGLE_MANAGE_SECTION_MODAL,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isShown', !isShown);
    });

    it('should handle TOGGLE_SECTION_COLLAPSE', () => {
        let isCollapsed = state.byId[1].isCollapsed;

        state = sections(state, {
            type: actions.TOGGLE_SECTION_COLLAPSE,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isCollapsed', !isCollapsed);
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

        expect(state.byId[1]).to.have.property(
            'isAddingNewComment',
            !isAddingNewComment
        );
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
        expect(state.byId[1].commentIds).to.have.members([4]);
    });

    it('should handle DELETED_COMMENT by removing the commentId from commentIds', () => {
        state = sections(state, {
            type: actions.DELETED_COMMENT,
            sectionId: 1,
            commentId: 4
        });

        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1].commentIds).to.not.include(4);
    });

    it('should handle ADDED_STAFF_RESPONSE', () => {
        const responseCount = state.byId[1].responseIds.length;

        state = sections(state, {
            type: actions.ADDED_STAFF_RESPONSE,
            sectionId: 1,
            staffId: 1,
            responseId: 100
        });

        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1].responseIds).to.have.length(responseCount + 1);
        expect(state.byId[1].responseIds).to.include(100);
    });

    it('should handle DELETED_STAFF_RESPONSE', () => {
        const responseCount = state.byId[1].responseIds.length;

        state = sections(state, {
            type: actions.DELETED_STAFF_RESPONSE,
            sectionId: 1,
            responseId: 100
        });

        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1].responseIds).to.not.include(100);
        expect(state.byId[1].responseIds).to.have.length(responseCount - 1);
    });
});
