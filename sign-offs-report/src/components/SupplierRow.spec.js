import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import SupplierRow from './SupplierRow';

const setup = props => {
    const component = mount(<SupplierRow {...props} />);

    return { component };
};

const toggleSupplierRow = sinon.spy();

describe('SupplierRow component: ', () => {
    const props = {
        id: 1,
        supplier: 'Test Supplier',
        count: 5,
        panel: 'Some panel',
        dateApplied: 'Now',
        isOpen: false,
        toggleSupplierRow
    };

    let { component } = setup(props);

    it('should be able to render the SupplierRow with props', () => {
        expect(component.find('td')).to.have.length(5);
        expect(component.find('p.supplier-title')).to.have.length(1);
        expect(component.find('.fa-chevron-down')).to.have.length(1);
    });

    it('should be able to show the toggle indicator when set to true', () => {
        let { component } = setup({ ...props, isOpen: true });
        expect(component.find('.fa-chevron-up')).to.have.length(1);
    });

    it('should be able to call toggleSupplierRow', function() {
        component.find('.toggler').simulate('click');
        expect(toggleSupplierRow.called).to.be.true;
    });
});
