import { expect } from 'chai';
import { suppliers } from './suppliers';
import * as actions from '../constants/ActionTypes';
import reports from '../mocks/reports.json';

describe('Suppliers reducer', () => {
    let state = {};
    let supplierIds = reports.data.map(
        report => report.attributes.preferred_supplier_id
    );

    it('should handle default state', () => {
        state = suppliers(undefined, {});
        expect(state).to.deep.equal({
            byId: {},
            allIds: []
        });
    });

    it('should handle RECEIVE_ASSIGNMENTS', () => {
        state = suppliers(state, {
            type: actions.RECEIVE_ASSIGNMENTS,
            assignments: reports
        });

        expect(state.allIds).to.have.members(supplierIds);
        supplierIds.map(supplierId => {
            expect(state.byId[supplierId]).to.be.an('object');
            expect(state.byId[supplierId]).to.have.property('isOpen', false);
        });
    });

    it('should handle TOGGLE_SUPPLIER_ROW', () => {
        let supplierId = supplierIds.pop();

        state = suppliers(state, {
            type: actions.TOGGLE_SUPPLIER_ROW,
            supplierId
        });

        expect(state.byId[supplierId]).to.have.property('isOpen', true);
    });
});
