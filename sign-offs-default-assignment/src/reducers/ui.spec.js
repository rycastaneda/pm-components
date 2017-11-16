import { expect } from 'chai';
import { ui } from './ui';
import * as actions from '../constants/ActionTypes';

describe('Ui reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = ui(undefined, {});
        expect(state).to.deep.equal({
            panelId: null,
            error: ''
        });
    });

    it('should handle FETCH_SECTIONS', () => {
        state = ui(state, {
            type: actions.FETCH_SECTIONS,
            panelId: 2
        });
        expect(state).to.have.property('panelId', 2);
    });

    it('should handle API_ERROR', () => {
        state = ui(state, {
            type: actions.API_ERROR,
            error: 'Something went wrong. Please try again later.'
        });

        expect(state.error).to.eql(
            'Something went wrong. Please try again later.'
        );
    });
});
