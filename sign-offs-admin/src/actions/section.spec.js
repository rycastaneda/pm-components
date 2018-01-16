import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './section';
import {
    FETCH_SECTIONS,
    RECEIVE_SECTIONS,
    TOGGLE_SECTION_COLLAPSE,
    TOGGLE_ALL_SECTION_COLLAPSE,
    TOGGLE_SECTION_LOADING,
    SWITCH_SECTION_TAB,
    TOGGLE_MANAGE_SECTION_MODAL
} from '../constants';
import { expect } from 'chai'; // You can use any testing library
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

axios.defaults.baseURL = 'https://httpbin.org/anything';

describe('Section actions', function() {
    const sectionId = 1;

    it('should call RECEIVE_SECTIONS after FETCH_SECTIONS if its successful', function() {
        const expectedActions = [FETCH_SECTIONS, RECEIVE_SECTIONS];
        const store = mockStore();
        return store.dispatch(actions.fetchSections()).then(() => {
            // return of async actions
            expect(store.getActions().map(action => action.type)).to.eql(
                expectedActions
            );
        });
    });

    it('should call TOGGLE_SECTION_COLLAPSE with sectionId as payload', () => {
        expect(actions.toggleSectionCollapse(1)).to.eql({
            type: TOGGLE_SECTION_COLLAPSE,
            sectionId
        });
    });

    it('should call TOGGLE_ALL_SECTION_COLLAPSE', () => {
        const store = mockStore({
            ui: { expandAll: false }
        });

        store.dispatch(actions.toggleAllSectionsCollapse());

        expect(store.getActions().pop()).to.eql({
            type: TOGGLE_ALL_SECTION_COLLAPSE,
            expandAll: true
        });
    });

    it('should call SWITCH_SECTION_TAB with sectionId and the new tab as payload', () => {
        expect(actions.switchSectionTab(1, 'comments')).to.eql({
            type: SWITCH_SECTION_TAB,
            sectionId,
            currentTab: 'comments'
        });
    });

    it('should call TOGGLE_SECTION_LOADING with sectionId as payload', () => {
        expect(actions.toggleSectionLoading(1)).to.eql({
            type: TOGGLE_SECTION_LOADING,
            sectionId
        });
    });

    it('should call TOGGLE_MANAGE_SECTION_MODAL', function() {
        expect(actions.toggleManageSectionModal(1)).to.eql({
            type: TOGGLE_MANAGE_SECTION_MODAL,
            sectionId
        });
    });
});
