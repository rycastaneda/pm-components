import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './section';
import * as types from '../constants/ActionTypes';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Section actions', function() {
    const sectionId = 1;

    it('should call RECEIVE_SECTIONS after FETCH_SECTIONS if its successful', function() {
        const expectedActions = [types.FETCH_SECTIONS, types.RECEIVE_SECTIONS];
        const store = mockStore();
        return store.dispatch(actions.fetchSections()).then(() => {
            // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });

    it('should call TOGGLE_SECTION_COLLAPSE with sectionId as payload', () => {
        expect(actions.toggleSectionCollapse(1)).to.eql({
            type: types.TOGGLE_SECTION_COLLAPSE,
            sectionId
        });
    });
});
