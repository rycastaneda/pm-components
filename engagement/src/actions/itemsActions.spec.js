import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';
import * as itemsActions from './itemsActions';

describe('Items actions: ', () => {

    it('receiveSuggestions should create a UPDATE_QUOTE_ID action', () => {
        expect(itemsActions.updateQuoteId(1)).to.deep.equal({
            type: types.UPDATE_QUOTE_ID,
            quoteId: 1
        });
    });

    it('receiveSuggestions should create a RECEIVE_SUGGESTIONS action', () => {
        expect(itemsActions.receiveSuggestions([])).to.deep.equal({
            type: types.RECEIVE_SUGGESTIONS,
            suggestions: []
        });
    });

    it('resetSuggestions should create a RESET_SUGGESTIONS action', () => {
        expect(itemsActions.resetSuggestions()).to.deep.equal({
            type: types.RESET_SUGGESTIONS,
            suggestions: []
        });
    });

    it('loadItemsSuccess should create a LOAD_ITEMS_SUCCESS action', () => {
        expect(itemsActions.loadItemsSuccess({})).to.deep.equal({
            type: types.LOAD_ITEMS_SUCCESS,
            items: {}
        });
    });

    it('loadItemsError should create a LOAD_ITEMS_ERROR action', () => {
        expect(itemsActions.loadItemsError({})).to.deep.equal({
            type: types.LOAD_ITEMS_ERROR,
            error: {}
        });
    });

    it('updateSuggestion should dispatch a UPDATE_SUGGESTION action', () => {
        const fn = itemsActions.updateSuggestion('test');
        const dispatch = sinon.spy();
        const getState = sinon.stub();
        getState.returns({ itemsReducer: { value: 'test' } });
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith({ type: types.UPDATE_SUGGESTION, value: 'test' })).to.equal(true);
    });

    it('fetchSuggestions function should get suggestions and dispatch receive suggestions action', () => {
        const fn = itemsActions.fetchSuggestions('test');
        const receiveSuggestions = itemsActions.receiveSuggestions;
        const dispatch = sinon.spy();
        const getState = sinon.stub().returns({
            itemsReducer: {
                items: {
                    data: [],
                    included: {}
                }
            }
        });
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith(receiveSuggestions([]))).to.equal(true);
    });

});
