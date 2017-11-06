import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './staff';
import { TOGGLE_STAFF_LOADING, CHANGE_STAFF_RESPONSE } from '../constants';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Staff actions', function() {
    const staffId = 5;

    it('should call TOGGLE_STAFF_LOADING -> CHANGE_STAFF_RESPONSE -> TOGGLE_STAFF_LOADING', function() {
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
                    status
                });

                expect(actions[2]).to.eql({
                    type: TOGGLE_STAFF_LOADING,
                    staffId
                });
            });
    });
});
