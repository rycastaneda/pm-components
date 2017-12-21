import { expect } from 'chai';
import { sections } from './sections';
import * as actions from '../constants/ActionTypes';
import mockSections from '../mocks/sections.json';

describe('Sections reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = sections(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: [],
            isLoading: true,
            allCollapsed: false
        });
    });

    it('should handle FETCH_SECTIONS', () => {
        state = sections(state, {
            type: actions.FETCH_SECTIONS
        });

        expect(state).to.have.property('isLoading', true);
    });

    it('should handle RECEIVE_SECTIONS', () => {
        state = sections(state, {
            type: actions.RECEIVE_SECTIONS,
            sections: mockSections
        });

        expect(state).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('isCollapsed', false);
        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1]).to.have.property('defaultUserIds');
        expect(state.byId[1]).to.have.property('userIdToAssignmentId');
        expect(state.byId[46].defaultUserIds).to.have.members(['80']);
        expect(state.allIds).to.have.members(
            mockSections.data.map(sections => '' + sections.id)
        );
    });

    it('should handle TOGGLE_SECTION_COLLAPSE', () => {
        let isCollapsed = state.byId[1].isCollapsed;

        state = sections(state, {
            type: actions.TOGGLE_SECTION_COLLAPSE,
            sectionId: 1
        });

        expect(state.byId[1]).to.have.property('isCollapsed', !isCollapsed);
    });

    it('should handle TOGGLE_ALL_SECTION_COLLAPSE', () => {
        let allCollapsed = state.allCollapsed;

        state = sections(state, {
            type: actions.TOGGLE_ALL_SECTION_COLLAPSE
        });

        expect(state.allCollapsed).to.eql(!allCollapsed);

        state.allIds.map(sectionId => {
            expect(state.byId[sectionId]).to.have.property(
                'isCollapsed',
                !allCollapsed
            );
        });
    });

    it('should handle ASSIGN_STAFF', () => {
        const defaultUserIdsCount = state.byId[1].defaultUserIds.length;

        state = sections(state, {
            type: actions.ASSIGN_STAFF,
            sectionId: 1,
            staffId: 100
        });

        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1].defaultUserIds).to.have.length(
            defaultUserIdsCount + 1
        );
        expect(state.byId[1].defaultUserIds).to.include(100);
    });

    it('should handle REMOVE_STAFF', () => {
        const defaultUserIdsCount = state.byId[1].defaultUserIds.length;

        state = sections(state, {
            type: actions.REMOVE_STAFF,
            sectionId: 1,
            staff: 100
        });

        expect(state.byId[1]).to.have.property('isLoading', false);
        expect(state.byId[1].defaultUserIds).to.not.include(100);
        expect(state.byId[1].defaultUserIds).to.have.length(
            defaultUserIdsCount - 1
        );
    });
});
