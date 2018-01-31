import { expect } from 'chai';
import { criterion } from './criterion';
import * as actions from '../constants/ActionTypes';
import mockEvaluation from '../mocks/evaluation';

describe('Criterion reducer', () => {
    let state = {};
    let criterionId = 1;

    it('should handle default state', () => {
        state = criterion(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            expandAll: false
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
        mockIds.map((evaluationId, index) => {
            expect(state.byId[evaluationId]).to.have.property('isOpen', !index);
            expect(state.byId[evaluationId]).to.have.property(
                'currentTab',
                'responses'
            );
        });
    });

    it('should handle TOGGLE_CRITERION_COLLAPSE to toggle a criterion accordion', () => {
        let oldState = state.byId[criterionId].isOpen;

        state = criterion(state, {
            type: actions.TOGGLE_CRITERION_COLLAPSE,
            criterionId
        });

        expect(state.byId[criterionId]).to.have.property('isOpen', !oldState);
    });

    it('should handle TOGGLE_CRITERION_COLLAPSE to toggle a criterion accordion', () => {
        let previousExpand = state.expandAll;
        state = criterion(state, {
            type: actions.TOGGLE_CRITERION_COLLAPSE,
            criterionId: null
        });
        expect(previousExpand).to.eql(!state.expandAll);
        state.allIds.map(criterionId => {
            expect(state.byId[criterionId]).to.have.property(
                'isOpen',
                state.expandAll
            );
        });
    });

    it('should handle TOGGLE_CRITERION_COLLAPSE to toggle all criterion accordion', () => {
        state = criterion(state, {
            type: actions.TOGGLE_CRITERION_COLLAPSE,
            criterionId: null
        });
    });
});
