import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './questions';
import {
    TOGGLE_SECTION_LOADING,
    RECEIVE_QUESTIONS
} from '../constants';
import { expect } from 'chai' ;// You can use any testing library
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Questions actions', function() {
    it('should call TOGGLE_SECTION_LOADING -> RECEIVE_QUESTIONS -> TOGGLE_SECTION_LOADING', function() {
        const expectedActions = [
            TOGGLE_SECTION_LOADING, 
            RECEIVE_QUESTIONS,
            TOGGLE_SECTION_LOADING
        ];

        const store = mockStore();

        return store.dispatch(actions.fetchQuestions()).then(() => { // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(expectedActions);
        });
    });
});

