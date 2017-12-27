import { expect } from 'chai';
import { evaluation } from './evaluation';
import * as actions from '../constants/ActionTypes';
import mockEvaluation from '../mocks/evaluation';

describe('Evaluation reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = evaluation(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = evaluation(state, {
            type: actions.RECEIVE_EVALUATION,
            evaluation: mockEvaluation
        });

        const mockIds = mockEvaluation.included
            .filter(included => included.type === 'evaluation-templates')
            .map(template => template.id);

        expect(state.allIds).to.eql(mockIds);
        mockIds.map(evaluationId => {
            expect(state.byId[evaluationId]).to.be.an('object');
            expect(state.byId[evaluationId]).to.have.property('criteriaIds');
        });
    });
});
