import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';
import * as suggestions from './suggestions';


describe('Suggestions actions: ', () => {
    it('receiveSuggestions function should dispatch a suggestions action', () => {
        expect(suggestions.receiveSuggestions([], 1)).to.deep.equal({
            type: types.RECEIVE_SUGGESTIONS,
            suggestions: [],
            index: 1
        });
    });

    it('resetSuggestions function should create a reset suggestions action', () => {
        expect(suggestions.resetSuggestions()).to.deep.equal({
            type: types.RESET_SUGGESTIONS,
            suggestions: []
        });
    });

    it('resetDropDowns function should create a reset dropdowns', () => {
        expect(suggestions.resetDropDowns(2)).to.deep.equal({
            type: types.RESET_DROPDOWNS,
            index: 2
        });
    });

    it('updateInput function should dispatch update input', () => {
        const fn = suggestions.updateInput('test', 0);
        const dispatch = sinon.spy();
        const getState = sinon.stub();
        getState.returns({ categorySelector: { dropDowns: [] } });
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith({ type: types.UPDATE_INPUT, value: 'test', index: 0 })).to.equal(true);
    });

    it('updateInput function should dispatch update input and reset child dropDowns', () => {
        const fn = suggestions.updateInput('test', 0);
        const resetDropDowns = suggestions.resetDropDowns;
        const dispatch = sinon.spy();
        const getState = sinon.stub();
        getState.returns({
            categorySelector: {
                dropDowns: {
                    1: true
                }
            }
        });
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.calledWith({ type: types.UPDATE_INPUT, value: 'test', index: 0 })).to.equal(true);
        expect(dispatch.calledWith(resetDropDowns(1))).to.equal(true);
    });

    it('fetchSuggestions function should get suggestions and dispatch receive suggestions action', () => {
        const fn = suggestions.fetchSuggestions('test', 0);
        const receiveSuggestions = suggestions.receiveSuggestions;
        const dispatch = sinon.spy();
        const getState = sinon.stub().returns({
            fetchedCategoryTypes: {
                'test': {
                    categories: {
                        data: [],
                        included: {}
                    }
                }
            },
            categorySelector: {
                selectedType: 'test',
                dropDowns: {}
            }
        });
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith(receiveSuggestions([], 0))).to.equal(true);
    });
});

