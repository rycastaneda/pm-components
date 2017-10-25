import { expect } from 'chai';
import { response } from './response';
import * as actions from '../constants';
import mockSections from '../mocks/sections.json';

describe('Response reducer', () => {
    let state = {};

    it('should handle RECEIVE_SECTIONS', () => {
        state = response(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state.byId[1]).to.have.property('status', 'In Progress');
        expect(state.allIds).to.have.members(['1', '2']);
    });

    it('should handle CHANGE_STAFF_RESPONSE', () => {
        state = response(state, {
            type: actions.CHANGE_STAFF_RESPONSE,
            responseId: 1,
            status: 'Approved'
        });

        expect(state.byId[1]).to.have.property('status', 'Approved');
    });

});