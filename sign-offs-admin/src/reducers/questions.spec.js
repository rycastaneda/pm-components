import { expect } from 'chai';
import { questions } from './questions';
import * as actions from '../constants';
import mockQuestions from '../mocks/questions.json';

describe('Questions reducer', () => {
    let sectionId = 1;
    let state = {};

    it('should handle default state', () => {
        state = questions(undefined, {});
        expect(state).to.deep.equal({
            bySectionId: {},
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = questions(state, {
            type: actions.RECEIVE_SECTIONS,
            sectionId,
            questions: mockQuestions
        });

        expect(state.bySectionId[1]).to.have.members(['3056', '3058', '3057']);
    });
});
