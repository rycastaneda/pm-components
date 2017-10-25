import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './comments';
import { comments } from '../reducers/comments';

import {
    TOGGLE_SECTION_LOADING,
    TOGGLE_COMMENT_BOX,
    TOGGLE_COMMENT_EDIT,
    SUBMITTED_NEW_COMMENT,
    SUBMITTED_EDIT_COMMENT,
    TOGGLE_COMMENT_LOADING,
    RECEIVE_SECTIONS,
    DELETED_COMMENT
} from '../constants';
import { expect } from 'chai' ;// You can use any testing library
import axios from 'axios';
import { format } from 'date-fns';

import mockSections from '../mocks/sections.json';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Comments actions', function() {

    let store = mockStore();
    let mockState = { 
        comments: comments(undefined, {
            type: RECEIVE_SECTIONS,
            sections: mockSections
        })
    };

    const sectionId = 1;

    it('should call TOGGLE_COMMENT_BOX with sectionId as payload', () => {
        expect(actions.toggleCommentBox(sectionId)).to.eql({
            type: TOGGLE_COMMENT_BOX,
            sectionId
        });
    });

    it('should call TOGGLE_SECTION_LOADING -> SUBMITTED_NEW_COMMENT with comment as payload', () => {
        store = mockStore(mockState);
        return store.dispatch(actions.submitNewComment(sectionId, 'new comment'))
            .then(() => { 
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: TOGGLE_SECTION_LOADING,
                    sectionId
                });

                expect(actions[1]).to.eql({
                    type: SUBMITTED_NEW_COMMENT,
                    sectionId,
                    staffId: 100,
                    staffName: 'Tester',
                    commentId: mockState.comments.allIds.length + 1,
                    comment: 'new comment',
                    date: format(new Date(), 'MM-DD-YYYY HH:m a')
                });

            });
    });

    it('should call TOGGLE_COMMENT_LOADING -> SUBMITTED_EDIT_COMMENT with comment and commentId to edit as payload', () => {
        const store = mockStore(mockState);
        return store.dispatch(actions.submitEditComment(sectionId, 2, 'Looks good to me'))
            .then(() => { 
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_COMMENT_LOADING,
                    commentId: 2
                });

                expect(actions[1]).to.eql({
                    type: SUBMITTED_EDIT_COMMENT,
                    sectionId,
                    commentId: 2,
                    comment: 'Looks good to me',
                    date: format(new Date(), 'MM-DD-YYYY HH:m a')
                });
            });
    });

    it('should call TOGGLE_COMMENT_EDIT with commentId as payload', () => {
        expect(actions.toggleCommentEdit(1)).to.eql({
            type: TOGGLE_COMMENT_EDIT,
            commentId: 1
        });
    });

    it('should call TOGGLE_COMMENT_LOADING -> DELETE_COMMENT with commentId and sectionId as payload', () => {
        const store = mockStore(mockState);

        return store.dispatch(actions.deleteComment(1, 4))
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_COMMENT_LOADING,
                    commentId: 4
                });

                expect(actions[1]).to.eql({
                    type: DELETED_COMMENT,
                    commentId: 4,
                    sectionId
                });
            });
    });
    
});