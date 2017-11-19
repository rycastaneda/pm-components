import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from './staff';
import { expect } from 'chai'; // You can use any testing library
import sinon from 'sinon';
import newResponse from '../mocks/newResponse.json';
import {
    RECEIVE_STAFF,
    TOGGLE_MANAGE_SECTION_MODAL_LOADING,
    ADDED_STAFF_RESPONSE,
    TOGGLE_STAFF_LOADING,
    CHANGE_STAFF_RESPONSE,
    DELETED_STAFF_RESPONSE
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Staff actions', function() {
    const sectionId = 1;
    const staffId = 5;
    const state = {
        ui: {
            currentStaffId: 31,
            preferredSupplierId: 57,
            supplierUserId: 7803
        },
        staff: {
            byId: {
                5: {
                    user_id: 7803
                }
            }
        },
        response: {
            allIds: [1, 2]
        }
    };
    let sandbox;
    let responseId;
    // eslint-disable-next-line no-undef
    beforeEach(() => (sandbox = sinon.sandbox.create()));
    // eslint-disable-next-line no-undef
    afterEach(() => sandbox.restore());

    it('should call TOGGLE_MANAGE_SECTION_MODAL_LOADING -> ADDED_STAFF_RESPONSE', function() {
        const resolved = new Promise(r => r({ data: { ...newResponse } })); // mock axios since we needed data from the response
        sandbox.stub(axios, 'post').returns(resolved);

        const store = mockStore(state);
        responseId = newResponse.data.id;

        return store
            .dispatch(actions.addStaffResponse(sectionId, staffId))
            .then(() => {
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: TOGGLE_MANAGE_SECTION_MODAL_LOADING
                });

                expect(actions[1]).to.eql({
                    type: ADDED_STAFF_RESPONSE,
                    sectionId,
                    responseId,
                    staffId
                });
            });
    });

    it('should call TOGGLE_STAFF_LOADING -> DELETED_STAFF_RESPONSE', function() {
        const store = mockStore();

        return store
            .dispatch(
                actions.deleteStaffResponse(sectionId, staffId, responseId)
            )
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_STAFF_LOADING,
                    staffId
                });

                expect(actions[1]).to.eql({
                    type: DELETED_STAFF_RESPONSE,
                    sectionId,
                    staffId,
                    responseId
                });
            });
    });

    it('should call TOGGLE_STAFF_LOADING -> CHANGE_STAFF_RESPONSE', function() {
        const store = mockStore();
        const responseId = 100;
        const statusId = 2;
        const status = 'Approved';

        return store
            .dispatch(
                actions.changeStaffResponse(
                    staffId,
                    responseId,
                    statusId,
                    status
                )
            )
            .then(() => {
                let actions = store.getActions();

                expect(actions[0]).to.eql({
                    type: TOGGLE_STAFF_LOADING,
                    staffId
                });

                expect(actions[1]).to.eql({
                    type: CHANGE_STAFF_RESPONSE,
                    responseId,
                    statusId,
                    staffId,
                    status
                });
            });
    });

    it('should call TOGGLE_MANAGE_SECTION_MODAL_LOADING -> RECEIVE_STAFF', function() {
        const expectedActions = [
            TOGGLE_MANAGE_SECTION_MODAL_LOADING,
            RECEIVE_STAFF,
            TOGGLE_MANAGE_SECTION_MODAL_LOADING
        ];

        const store = mockStore({
            staff: {
                needsFetching: true
            }
        });

        return store.dispatch(actions.fetchStaff()).then(() => {
            // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });
});
