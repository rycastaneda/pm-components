import { expect } from 'chai';
import { comments } from './comments';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';

describe('Comments reducer', () => {
    let state = {};
    
    it('should handle default state', () => {
        state = comments(undefined, {});
        expect(state).to.deep.equal({ 
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = comments(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state.allIds).to.have.members(
            mockSections.included.filter(include => include.type === 'comment').map(comments => '' + comments.id)
        );
    });

    it('should handle TOGGLE_COMMENT_EDIT', () => {
        const isEditing = state.byId[1].isEditing;

        state = comments(state, {
            type: actions.TOGGLE_COMMENT_EDIT,
            commentId: 1
        });

        expect(state.byId[1]).to.have.property('isEditing', !isEditing);
    });

    it('should handle TOGGLE_COMMENT_LOADING', () => {
        const isLoading = state.byId[1].isLoading;

        state = comments(state, {
            type: actions.TOGGLE_COMMENT_LOADING,
            commentId: 1
        });

        expect(state.byId[1]).to.have.property('isLoading', !isLoading);
    });


    it('should handle SUBMITTED_EDIT_COMMENT', () => {
        state = comments(state, {
            type: actions.SUBMITTED_EDIT_COMMENT,
            sectionId: 1,
            commentId: 1,
            comment: 'Just kidding'
        });

        expect(state.byId[1]).to.have.property('isEditing', false);
        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('comment', 'Just kidding');
        expect(state.byId[1]).to.have.property('date');
    });


    it('should handle SUBMITTED_NEW_COMMENT on a new comment', () => {
        let previousIdCount = state.allIds.length;

        state = comments(state, {
            type: actions.SUBMITTED_NEW_COMMENT,
            sectionId: 1,
            staffId: 100,
            staffName: 'test',
            commentId: 5,
            comment: 'New Comment'
        });

        expect(state.byId[5]).to.have.property('isEditing', false);
        expect(state.byId[5]).to.have.property('isLoading', false);
        expect(state.byId[5]).to.have.property('comment', 'New Comment');
        expect(state.byId[5]).to.have.property('date');
        expect(state.allIds.length).to.eql(previousIdCount + 1);
    });

    it('should handle DELETED_COMMENT on a new comment', () => {
        state = comments(state, {
            type: actions.DELETED_COMMENT,
            commentId: 5
        });

        expect(state.byId[5]).to.be.undefined;
        expect(state.allIds).to.not.include(5);
    });

});