import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import StaffDropdown from './StaffDropdown';
import mockStaff from '../mocks/staff.json';

const setup = (props) => {
    const component = shallow(
        <StaffDropdown {...props} />
    );

    return { component };
};

const addStaff = sinon.spy();

const staffs = mockStaff.data.map((staff) => {
    return {
        id: staff.id,
        ...staff.attributes
    };
});

describe('StaffDropdown component: ', () => {
    const { component } = setup({ 
        addStaff,
        staffs
    });

    it('should render the select component with staffs and addStaff to be called', () => {
        let props = component.find('Select').props();
        expect(props).to.have.property('options', staffs);
        component.find('Select').simulate('change');
        expect(addStaff.called).to.be.true;
    });
});