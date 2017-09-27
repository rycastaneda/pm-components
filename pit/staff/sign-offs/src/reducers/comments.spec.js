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
            allIds: [],
            addingNewComment: false
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
        state = comments(state, {
            type: actions.TOGGLE_COMMENT_EDIT,
            commentId: 1
        });

        expect(state.byId[1]).to.have.property('isEditing', true);
    });

    it('should handle SUBMITTING_COMMENT on editing comment', () => { 
        state = comments(state, {
            type: actions.SUBMITTING_COMMENT,
            commentId: 1 // test case for newly edit comment so we need to specify commentId
        });

        expect(state.byId[1]).to.have.property('isEditing', true);
        expect(state.byId[1]).to.have.property('isLoading', true);
    });

    it('should handle SUBMITTING_COMMENT on a new comment', () => { 
        state = comments(state, {
            type: actions.SUBMITTING_COMMENT,
            commentId: null 
        });

        expect(state.addingNewComment).to.eql(true);
    });

    it('should handle SUBMITTED_COMMENT on a changed comment', () => {
        state = comments(state, {
            type: actions.SUBMITTED_COMMENT,
            commentId: 1,
            comment: 'Just kidding'
        });

        expect(state.byId[1]).to.have.property('isEditing', false);
        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('comment', 'Just kidding');
    });


    it('should handle SUBMITTED_COMMENT on a new comment', () => {
        let previousIdCount = state.allIds.length;

        state = comments(state, {
            type: actions.SUBMITTED_COMMENT,
            commentId: 5,
            comment: 'New Comment'
        });

        expect(state.addingNewComment).to.eql(false);
        expect(state.byId[5]).to.have.property('isEditing', false);
        expect(state.byId[5]).to.have.property('isLoading', false);
        expect(state.byId[5]).to.have.property('comment', 'New Comment');
        expect(state.allIds.length).to.eql(previousIdCount + 1);
    });

});