import { expect } from 'chai';
import { ui } from './ui';
import * as actions from '../constants/ActionTypes';
import reports from '../mocks/reports.json';

describe('UI reducer', () => {
    let state = {};

    it('should handle default state', () => {
        state = ui(undefined, {});
        expect(state).to.deep.equal({
            error: null,
            orderByField: 'status',
            orderByDirection: 'desc',
            keyword: '',
            filters: {
                assignee: '',
                status: [0, 1]
            },
            page: 1,
            perPage: 30,
            totalPage: 1,
            currentAssignment: ''
        });
    });

    it('should handle FETCH_ASSIGNMENTS', () => {
        const filters = {
            assignee: 'Staff',
            status: [0, 1]
        };

        state = ui(state, {
            type: actions.FETCH_ASSIGNMENTS,
            organizationId: 1,
            keyword: 'New Supplier',
            orderByField: 'status',
            orderByDirection: 'asc',
            filters,
            page: 1,
            perPage: 30
        });

        expect(state).to.have.property('keyword', 'New Supplier');
        expect(state).to.have.property('orderByField', 'status');
        expect(state).to.have.property('orderByDirection', 'asc');
        expect(state).to.have.property('page', 1);
        expect(state).to.have.property('perPage', 30);
        expect(state).to.have.property('currentAssignment', '');
        expect(state.filters).to.deep.eql(filters);
    });

    it('should handle RECEIVE_ASSIGNMENTS', () => {
        state = ui(state, {
            type: actions.RECEIVE_ASSIGNMENTS,
            assignments: reports
        });

        expect(state.totalPage).to.eql(reports.meta.pagination.total_pages);
    });

    it('should handle TOGGLE_COMMENT_MODAL', () => {
        const assignmentId = 90;

        state = ui(state, {
            type: actions.TOGGLE_COMMENT_MODAL,
            assignmentId
        });

        expect(state.currentAssignment).to.eql(assignmentId);
    });

    it('should handle API_ERROR', () => {
        state = ui(state, {
            type: actions.API_ERROR,
            error: 'Something went wrong. Please try again later.'
        });

        expect(state.error).to.eql(
            'Something went wrong. Please try again later.'
        );
    });
});
