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

    it('should handle ADDED_STAFF_RESPONSE', () => {
        const responseCount = state.allIds.length;

        state = response(state, {
            type: actions.ADDED_STAFF_RESPONSE,
            sectionId: 1,
            staffId: 1,
            responseId: 100
        });

        expect(state.byId[100]).to.not.be.undefined;
        expect(state.byId[100]).to.have.property('status', 'Pending');
        expect(state.allIds).to.have.length(responseCount + 1);
    });

    it('should handle CHANGE_STAFF_RESPONSE', () => {
        state = response(state, {
            type: actions.CHANGE_STAFF_RESPONSE,
            responseId: 100,
            status: 'Approved'
        });

        expect(state.byId[100]).to.have.property('status', 'Approved');
    });

    it('should handle DELETED_STAFF_RESPONSE', () => {
        const responseCount = state.allIds.length;

        state = response(state, {
            type: actions.DELETED_STAFF_RESPONSE,
            sectionId: 1,
            responseId: 100
        });

        expect(state.byId[100]).to.be.undefined;
        expect(state.allIds).to.have.length(responseCount - 1);
    });

});