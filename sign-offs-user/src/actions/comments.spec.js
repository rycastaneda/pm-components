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
import { expect } from 'chai';
import axios from 'axios';
import { format } from 'date-fns';
import sinon from 'sinon';
import mockSections from '../mocks/sections.json';
import newComment from '../mocks/newComment.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Comments actions', function() {
    let mockState = {
        comments: comments(undefined, {
            type: RECEIVE_SECTIONS,
            sections: mockSections
        }),
        ui: {
            preferredSupplierId: 1
        }
    };
    let sandbox;
    const sectionId = 1;

    // eslint-disable-next-line no-undef
    beforeEach(() => (sandbox = sinon.sandbox.create()));
    // eslint-disable-next-line no-undef
    afterEach(() => sandbox.restore());

    it('should call TOGGLE_COMMENT_BOX with sectionId as payload', () => {
        expect(actions.toggleCommentBox(sectionId)).to.eql({
            type: TOGGLE_COMMENT_BOX,
            sectionId
        });
    });

    it('should call TOGGLE_SECTION_LOADING -> SUBMITTED_NEW_COMMENT with comment as payload', () => {
        const resolved = new Promise(r => r({ data: { ...newComment } })); // mock axios since we needed data from the response
        sandbox.stub(axios, 'post').returns(resolved);

        const expectedActions = [TOGGLE_SECTION_LOADING, SUBMITTED_NEW_COMMENT];
        const store = mockStore(mockState);

        return store
            .dispatch(actions.submitNewComment(sectionId, 'new comment'))
            .then(() => {
                // return of async actions
                expect(store.getActions().map(action => action.type)).to.eql(
                    expectedActions
                );
            });
    });

    it('should call TOGGLE_COMMENT_LOADING -> SUBMITTED_EDIT_COMMENT with comment and commentId to edit as payload', () => {
        const store = mockStore(mockState);
        const commentEditId = 2;
        return store
            .dispatch(
                actions.submitEditComment(
                    sectionId,
                    commentEditId,
                    'Looks good to me'
                )
            )
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_COMMENT_LOADING,
                    commentId: commentEditId
                });

                expect(actions[1]).to.eql({
                    type: SUBMITTED_EDIT_COMMENT,
                    sectionId,
                    commentId: commentEditId,
                    comment: 'Looks good to me',
                    date: format(new Date(), 'MM-DD-YYYY HH:m:s')
                });
            });
    });

    it('should call TOGGLE_COMMENT_EDIT with commentId as payload', () => {
        const commentId = 1;
        expect(actions.toggleCommentEdit(commentId)).to.eql({
            type: TOGGLE_COMMENT_EDIT,
            commentId
        });
    });

    it('should call TOGGLE_COMMENT_LOADING -> DELETE_COMMENT with commentId and sectionId as payload', () => {
        const store = mockStore(mockState);
        const commentDeleteId = 4;

        return store
            .dispatch(actions.deleteComment(sectionId, commentDeleteId))
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_COMMENT_LOADING,
                    commentId: commentDeleteId
                });

                expect(actions[1]).to.eql({
                    type: DELETED_COMMENT,
                    commentId: commentDeleteId,
                    sectionId
                });
            });
    });
});
