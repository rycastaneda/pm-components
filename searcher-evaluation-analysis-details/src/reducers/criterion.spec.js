import { expect } from 'chai';
import { criterion } from './criterion';
import * as actions from '../constants/ActionTypes';
import mockEvaluation from '../mocks/evaluation';

describe('Criterion reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = criterion(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = criterion(state, {
            type: actions.RECEIVE_EVALUATION,
            evaluation: mockEvaluation
        });

        const mockIds = mockEvaluation.included
            .filter(included => included.type === 'evaluation-criteria')
            .map(question => question.id);

        expect(state.allIds).to.eql(mockIds);
        mockIds.map(evaluationId => {
            expect(state.byId[evaluationId]).to.have.property('isOpen', false);
            expect(state.byId[evaluationId]).to.have.property(
                'currentTab',
                'responses'
            );
        });
    });
});
