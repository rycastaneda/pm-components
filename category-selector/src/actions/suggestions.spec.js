import * as types from '../constants/ActionTypes';
import * as suggestions from './suggestions';
import { expect } from 'chai';

describe('Suggestions actions: ', () => {
    it('receiveSuggestions function should create a receive suggestions action', () => {
        expect(suggestions.receiveSuggestions([], 1)).to.deep.equal({
            type: types.RECEIVE_SUGGESTIONS,
            suggestions: [],
            index: 1
        });
    });
});

