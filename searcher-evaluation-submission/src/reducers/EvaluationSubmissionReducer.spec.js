import { expect } from 'chai';
import { evaluationSubmission } from './boilerplate';
import * as types from '../constants/ActionTypes';

describe('EvaluationSubmission reducer', () => {
    it('should handle default state', () => {
        expect(boilerplate(undefined, {})).to.deep.equal({ buttonIsClicked: false });
    });

    it('should handle IS_CLICKED', () => {
        expect(boilerplate({}, { type: types.IS_CLICKED })).to.deep.equal({ buttonIsClicked: true });
    });

    it('should handle INITIAL_STATE', () => {
        expect(boilerplate({}, { type: types.INITIAL_STATE })).to.deep.equal({ buttonIsClicked: false });
    });
});
