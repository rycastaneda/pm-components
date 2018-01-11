import { expect } from 'chai';
import { entity } from './entity';
import mockEvaluation from '../mocks/evaluation.json';
import * as actions from '../constants/ActionTypes';

describe('Entity reducer', () => {
    let state = {};
    let entityInstance =
        mockEvaluation.data.relationships.assignmentEntityInstance.data;

    let ent = mockEvaluation.included
        .filter(include => include.type === entityInstance.type)
        .pop();

    it('should handle default state', () => {
        state = entity(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_EVALUATION', () => {
        state = entity(undefined, {
            type: actions.RECEIVE_EVALUATION,
            evaluation: mockEvaluation
        });

        expect(state.allIds).to.deep.equal([ent.id]);
        expect(state.byId[ent.id]).to.have.property('type', ent.type);
    });
});
