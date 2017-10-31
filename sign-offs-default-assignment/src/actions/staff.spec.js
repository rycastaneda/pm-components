import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './staff';
import * as types from '../constants/ActionTypes';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Staff actions', function() {
    let store;

    // eslint-disable-next-line
    beforeEach(() => {
        store = mockStore({
            staff: {
                needsFetching: true
            }
        });
    });

    const sectionId = 1;
    const staffId = 5;

    it('should call TOGGLE_SECTION_LOADING -> RECEIVE_STAFF', function() {
        const expectedActions = [
            types.TOGGLE_SECTION_LOADING,
            types.RECEIVE_STAFF
        ];

        return store.dispatch(actions.fetchStaff()).then(() => {
            // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });

    it('should call TOGGLE_MANAGE_SECTION_MODAL_LOADING -> ASSIGN_STAFF', function() {
        const store = mockStore();

        return store
            .dispatch(actions.assignStaff(sectionId, staffId))
            .then(() => {
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: types.TOGGLE_SECTION_LOADING,
                    sectionId
                });

                expect(actions[1]).to.eql({
                    type: types.ASSIGN_STAFF,
                    sectionId,
                    staffId
                });
            });
    });

    it('should call TOGGLE_SECTION_LOADING -> REMOVE_STAFF', function() {
        const store = mockStore();

        return store
            .dispatch(actions.removeStaff(sectionId, staffId))
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: types.TOGGLE_SECTION_LOADING,
                    sectionId
                });

                expect(actions[1]).to.eql({
                    type: types.REMOVE_STAFF,
                    sectionId,
                    staffId
                });
            });
    });
});
