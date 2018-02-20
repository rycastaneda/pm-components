import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';
import * as actions from './evaluation';
import {
    FETCH_EVALUATION,
    RECEIVE_EVALUATION,
    TOGGLE_CRITERION_COLLAPSE,
    CHANGE_VIEW,
    CHANGE_TAB
} from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Evaluation actions', function() {
    const assignmentId = 1;
    const canViewAll = true;
    const view = 'all';
    const criterionId = 1;
    const tab = 'reports';

    it('should call CHANGE_VIEW with view as payload', () => {
        expect(actions.changeView(view)).to.eql({
            type: CHANGE_VIEW,
            view
        });
    });

    it('should call CHANGE_TAB with tab as payload', () => {
        expect(actions.changeTab(criterionId, tab)).to.eql({
            type: CHANGE_TAB,
            criterionId,
            tab
        });
    });

    it('should call TOGGLE_CRITERION_COLLAPSE with view as payload', () => {
        expect(actions.toggleCriterionCollapse(criterionId)).to.eql({
            type: TOGGLE_CRITERION_COLLAPSE,
            criterionId
        });
    });

    it('should call FETCH_EVALUATION -> RECEIVE_EVALUATION with comment as payload', () => {
        const store = mockStore({
            ui: {
                assignmentId
            }
        });
        return store
            .dispatch(actions.fetchEvaluation(assignmentId, view, canViewAll))
            .then(() => {
                let actions = store.getActions();
                expect(actions[0]).to.eql({
                    type: FETCH_EVALUATION,
                    assignmentId,
                    currentView: view,
                    canViewAll
                });
                expect(actions[1].type).to.eql(RECEIVE_EVALUATION);
            });
    });
});
