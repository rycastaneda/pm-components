import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import RowHeader from './RowHeader';

const setup = props => {
    const component = mount(<RowHeader {...props} />);

    return { component };
};

const toggleSupplierRow = sinon.spy();

describe('RowHeader component: ', () => {
    const props = {
        id: 1,
        supplier: 'Test Supplier',
        count: 5,
        isOpen: false,
        toggleSupplierRow
    };

    let { component } = setup(props);

    it('should be able to render the RowHeader with props', () => {
        expect(component.find('td')).to.have.length(1);
        expect(component.find('p.supplier-title')).to.have.length(1);
        expect(component.find('.fa-chevron-down')).to.have.length(1);
    });

    it('should be able to show the toggle indicator when set to true', () => {
        let { component } = setup({ ...props, isOpen: true });
        expect(component.find('.fa-chevron-up')).to.have.length(1);
    });

    it('should be able to call toggleSupplierRow', function() {
        component.simulate('click');
        expect(toggleSupplierRow.called).to.be.true;
    });
});
