import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from '../constants';
import { expect } from 'chai' ;// You can use any testing library
import axios from 'axios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let token = '';

axios.defaults.baseURL = 'http://admin.pm.local.dev';
axios.defaults.headers.common = {
    'Accept': 'application/vnd.pm.v1+json',
    'Content-Type': 'application/json'
};

describe('async actions', () => {
    before(function(done) { // eslint-disable-line no-undef
        this.timeout = 5000;
        // runs before all tests in this block
        axios.post('/authenticate', {
            autologin_code: 'a17c324ab235ad79e2d6a962270a5a8078fd5905' // autologin_code of a PIT STAFF
        }).then((response) => {
            token = response.data.token;
            axios.defaults.headers.common = {
                'Authorization' : 'Bearer ' + token,
                'Accept': 'application/vnd.pm.v1+json',
                'Content-Type': 'application/json'
            };
            done();
        }).catch(() => {
            done();
        });
    });

    it('should call RECEIVE_SECTIONS after FETCH_SECTIONS if its successful', () => {
        const expectedActions = [types.FETCH_SECTIONS, types.RECEIVE_SECTIONS];
        const store = mockStore();
        return store.dispatch(actions.fetchSections())
            .then(() => { // return of async actions
                expect(store.getActions().map(action => action.type)).to.eql(expectedActions);
            });
    });

    it('should call TOGGLE_SECTION with sectionId as payload', () => {
        expect(actions.toggleSection(1)).to.eql({
            type: types.TOGGLE_SECTION,
            sectionId: 1
        });
    });

    it('should call SWITCH_TAB with sectionId and the new tab as payload', () => {
        expect(actions.switchTab(1, 'comments')).to.eql({
            type: types.SWITCH_TAB,
            sectionId: 1, 
            currentTab: 'comments'
        });
    });

    it('should call TOGGLE_STATUS with sectionId and new status as payload', () => {
        expect(actions.toggleStatus(1, 'Approved')).to.eql({
            type: types.TOGGLE_STATUS,
            sectionId: 1,
            status: 'Approved'
        });
    });

    it('should call TOGGLE_COMMENT_BOX with sectionId as payload', () => {
        expect(actions.toggleCommentBox(1)).to.eql({
            type: types.TOGGLE_COMMENT_BOX,
            sectionId: 1
        });
    });

    it('should call SUBMIT_COMMENT with comment and commentId to edit as payload', () => {
        const store = mockStore();
        return store.dispatch(actions.submitComment(1, 'Looks good to me'))
            .then(() => { // return of async actions
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: types.SUBMITTING_COMMENT,
                    commentId: 1
                });
                
                expect(actions[1]).to.have.property('comment', 'Looks good to me');
            });
    });

    it('should call SUBMIT_COMMENT with comment and empty commentId as payload', () => {
        const store = mockStore();
        return store.dispatch(actions.submitComment(null, 'new comment'))
            .then(() => { // return of async actions
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: types.SUBMITTING_COMMENT,
                    commentId: null
                });

                expect(actions[1]).to.have.property('commentId');
                expect(actions[1]).to.have.property('comment', 'new comment');
            });
    });

    it('should call TOGGLE_COMMENT_EDIT with commentId as payload', () => {
        expect(actions.toggleCommentEdit(1)).to.eql({
            type: types.TOGGLE_COMMENT_EDIT,
            commentId: 1
        });
    });

});