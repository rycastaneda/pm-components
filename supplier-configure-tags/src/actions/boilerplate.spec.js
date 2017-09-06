import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';
import * as actions from './boilerplate';


describe('Categories actions: ', () => {
    it('updateState function should NOT dispatch any actions when button is clicked', () => {
        const mockedState = {
            boilerplate: {
                buttonIsClicked: true
            }
        };
        const fn = actions.updateState();
        const dispatch = sinon.spy();
        const getState = sinon.stub().returns(mockedState);

        fn(dispatch, getState);

        expect(fn).is.a('function');
        // Dispatch should not be called
        expect(dispatch.callCount).to.equal(0);
    });

    it('updateState function should dispatch a button click action', () => {
        const mockedState = {
            boilerplate: {}
        };
        const fn = actions.updateState();
        const dispatch = sinon.spy();
        const getState = sinon.stub().returns(mockedState);

        fn(dispatch, getState);

        expect(fn).is.a('function');
        // Dispatch function is called once
        expect(dispatch.callCount).to.equal(1);
        // Dispatch is called with the correct state
        expect(dispatch.calledWith({ type: types.IS_CLICKED })).to.equal(true);
    });

    it('resetState function should dispatch a reset of an initial state', () => {
        expect(actions.resetState()).to.deep.equal({
            type: types.INITIAL_STATE
        });
    });
});
