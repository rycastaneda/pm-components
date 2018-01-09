import { expect } from 'chai';
import { assignments } from './assignments';
import * as actions from '../constants';
import reports from '../mocks/reports.json';
describe('Assignments reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = assignments(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            isLoading: true
        });
    });

    it('should handle FETCH_ASSIGNMENTS', () => {
        state = assignments(state, {
            type: actions.FETCH_ASSIGNMENTS
        });

        expect(state).to.have.property('isLoading', true);
    });

    it('should handle DOWNLOADED_ASSIGNMENTS', () => {
        state = assignments(state, {
            type: actions.DOWNLOADED_ASSIGNMENTS
        });

        expect(state).to.have.property('isLoading', false);
    });

    it('should handle RECEIVE_ASSIGNMENTS', () => {
        state = assignments(state, {
            type: actions.RECEIVE_ASSIGNMENTS,
            assignments: reports
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.allIds).to.have.length(reports.data.length);
        expect(state.byId[state.allIds[0]]).to.have.property('commentIds');
    });

    it('should handle TOGGLE_COMMENT_MODAL', function() {
        const assignmentId = 4;
        const isShown = state.byId[assignmentId].isShown;
        state = assignments(state, {
            type: actions.TOGGLE_COMMENT_MODAL,
            assignmentId
        });

        expect(state.byId[assignmentId]).to.have.property('isShown', !isShown);
    });
});
