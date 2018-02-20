import { expect } from 'chai';
import { boilerplate } from './boilerplate';
import * as types from '../constants/ActionTypes';

describe('Boilerpate reducer', () => {
    let state;
    it('should handle default state', () => {
        expect(boilerplate(undefined, {})).to.deep.equal({
            buttonIsClicked: false,
            counter: 0
        });
    });

    it('should handle IS_CLICKED', () => {
        expect(boilerplate({}, { type: types.IS_CLICKED })).to.deep.equal({
            buttonIsClicked: true,
            counter: 0
        });
    });

    it('should handle INITIAL_STATE', () => {
        state = boilerplate({}, { type: types.INITIAL_STATE });
        expect(state).to.deep.equal({
            buttonIsClicked: false,
            counter: 0
        });
    });

    it('should handle INCREMENT_COUNTER', () => {
        const previousCounter = state.counter;
        state = boilerplate(state, { type: types.INCREMENT_COUNTER });
        expect(state).to.have.property('counter', previousCounter + 1);
    });

    it('should handle DECREMENT_COUNTER', () => {
        const previousCounter = state.counter;
        state = boilerplate(state, { type: types.DECREMENT_COUNTER });
        expect(state).to.have.property('counter', previousCounter - 1);
    });
});
