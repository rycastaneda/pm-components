import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './reports';
import * as types from '../constants/ActionTypes';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Assignments actions', function() {
    it('should call RECEIVE_ASSIGNMENTS after FETCH_ASSIGNMENTS if its successful', function() {
        const expectedActions = [
            types.FETCH_ASSIGNMENTS,
            types.RECEIVE_ASSIGNMENTS
        ];
        const store = mockStore();
        return store.dispatch(actions.fetchSections()).then(() => {
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });

    it('should call RECEIVE_STAFF after FETCH_STAFF if its successful', function() {
        const expectedActions = [types.FETCH_STAFF, types.RECEIVE_STAFF];
        const store = mockStore();
        return store.dispatch(actions.fetchStaff()).then(() => {
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });

    it('should call RECEIVE_STAFF after FETCH_COMMENT if its successful', function() {
        const expectedActions = [types.FETCH_COMMENT, types.RECEIVE_COMMENT];
        const store = mockStore();
        const assignmentId = 1;
        const sectionId = 7;
        const preferredSupplierId = 71;

        return store
            .dispatch(
                actions.fetchComment(
                    assignmentId,
                    sectionId,
                    preferredSupplierId
                )
            )
            .then(() => {
                expect(store.getActions().map(action => action.type)).to.eql(
                    expectedActions
                );
            });
    });

    it('should call TOGGLE_COMMENT_MODAL', function() {
        const assignmentId = 1;
        expect(actions.toggleCommentModal(assignmentId)).to.eql({
            type: types.TOGGLE_COMMENT_MODAL,
            assignmentId
        });
    });
});
