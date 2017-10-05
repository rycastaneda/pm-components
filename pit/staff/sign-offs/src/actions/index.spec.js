import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from '../constants';
import { expect } from 'chai' ;// You can use any testing library
import axios from 'axios';
import format from 'date-fns/format';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockState = {
    comments: {
        byId: {
            1: {
                'comment': 'Company size is too small, still considering',
                'date': '09-17-2017 9:20:00 AM',
                'staffId': 1,
                'isEditing': false,
                'isLoading': false
            },
            2: {
                'comment': 'I dont like his pets name, sounds elvish',
                'date': '09-17-2017 9:20:00 AM',
                'staffId': 2,
                'isEditing': false,
                'isLoading': false
            },
            3: {
                'comment': 'Company too far',
                'date': '09-17-2017 9:20:00 AM',
                'staffId': 3,
                'isEditing': false,
                'isLoading': false
            }
        },
        allIds: ['1', '2', '3']
    },
    staff: {
        byId: {
            1: {
                name: 'Reese'
            }
        }
    }
};
let token = '';

axios.defaults.baseURL = 'http://admin.pm.local.dev';
axios.defaults.headers.common = {
    'Accept': 'application/vnd.pm.v1+json',
    'Content-Type': 'application/json'
};

describe('Sign Off actions', function() {
    this.timeout(5000);

    before(function(done) {  // eslint-disable-line no-undef
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

    it('should call RECEIVE_SECTIONS after FETCH_SECTIONS if its successful', function() {
        const expectedActions = [types.FETCH_SECTIONS, types.RECEIVE_SECTIONS];
        const store = mockStore();
        return store.dispatch(actions.fetchSections()).then(() => { // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(expectedActions);
        });
    });

    it('should call TOGGLE_SECTION_COLLAPSE with sectionId as payload', () => {
        expect(actions.toggleSectionCollapse(1)).to.eql({
            type: types.TOGGLE_SECTION_COLLAPSE,
            sectionId: 1
        });
    });

    it('should call SWITCH_SECTION_TAB with sectionId and the new tab as payload', () => {
        expect(actions.switchSectionTab(1, 'comments')).to.eql({
            type: types.SWITCH_SECTION_TAB,
            sectionId: 1, 
            currentTab: 'comments'
        });
    });

    it('should call TOGGLE_SECTION_STATUS with sectionId and new status as payload', () => {
        expect(actions.toggleSectionStatus(1, 'Approved')).to.eql({
            type: types.TOGGLE_SECTION_STATUS,
            sectionId: 1,
            status: 'Approved'
        });
    });

    it('should call TOGGLE_SECTION_LOADING with sectionId as payload', () => {
        expect(actions.toggleSectionLoading(1)).to.eql({
            type: types.TOGGLE_SECTION_LOADING,
            sectionId: 1
        });
    });

    it('should call TOGGLE_COMMENT_BOX with sectionId as payload', () => {
        expect(actions.toggleCommentBox(1)).to.eql({
            type: types.TOGGLE_COMMENT_BOX,
            sectionId: 1
        });
    });

    it('should call SUBMITTED_NEW_COMMENT with comment as payload', () => {
        const store = mockStore(mockState);

        return store.dispatch(actions.submitNewComment(1, 'new comment'))
            .then(() => { 
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: types.TOGGLE_SECTION_LOADING,
                    sectionId: 1
                });

                expect(actions[1]).to.eql({
                    type: types.SUBMITTED_NEW_COMMENT,
                    sectionId: 1,
                    staffId: 100,
                    staffName: 'Tester',
                    commentId: mockState.comments.allIds.length + 1,
                    comment: 'new comment',
                    date: format(new Date(), 'MM-DD-YYYY HH:m a')
                });

            });
    });

    it('should call SUBMITTED_EDIT_COMMENT with comment and commentId to edit as payload', () => {
        const store = mockStore(mockState);
        return store.dispatch(actions.submitEditComment(1, 4, 'Looks good to me'))
            .then(() => { 
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: types.TOGGLE_COMMENT_LOADING,
                    commentId: 4
                });

                expect(actions[1]).to.eql({
                    type: types.SUBMITTED_EDIT_COMMENT,
                    sectionId: 1,
                    commentId: 4,
                    comment: 'Looks good to me',
                    date: format(new Date(), 'MM-DD-YYYY HH:m a')
                });

            });
    });

    it('should call TOGGLE_COMMENT_EDIT with commentId as payload', () => {
        expect(actions.toggleCommentEdit(1)).to.eql({
            type: types.TOGGLE_COMMENT_EDIT,
            commentId: 1
        });
    });

    it('should call DELETE_COMMENT with commentId and sectionId as payload', () => {
        const store = mockStore(mockState);

        return store.dispatch(actions.deleteComment(1, 4))
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: types.TOGGLE_COMMENT_LOADING,
                    commentId: 4
                });

                expect(actions[1]).to.eql({
                    type: types.DELETED_COMMENT,
                    commentId: 4,
                    sectionId: 1
                });
            });
    });

});