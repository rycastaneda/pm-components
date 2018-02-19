import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './assignments';
import * as types from '../constants';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';
import { ui } from '../reducers/ui';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Assignments actions', function() {
    const uiState = ui(undefined, {});

    it('should call RECEIVE_ASSIGNMENTS after FETCH_ASSIGNMENTS if its successful', function() {
        const expectedActions = [
            types.FETCH_ASSIGNMENTS,
            types.RECEIVE_ASSIGNMENTS
        ];
        const store = mockStore();
        return store.dispatch(actions.fetchAssignments(uiState)).then(() => {
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

    it('should call RECEIVE_COMMENT after FETCH_COMMENT if its successful', function() {
        const expectedActions = [types.FETCH_COMMENT, types.RECEIVE_COMMENT];
        const store = mockStore();
        const assignmentId = 1;
        const sectionId = 7;
        const preferredSupplierId = 71;

        return store
            .dispatch(
                actions.fetchComments(
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

    it('should call TOGGLE_SUPPLIER_ROW', function() {
        const supplierId = 1;
        expect(actions.toggleSupplierRow(supplierId)).to.eql({
            type: types.TOGGLE_SUPPLIER_ROW,
            supplierId
        });
    });
});
