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

const onStaffChange = sinon.spy();

const staff = mockStaff.data.map((staff) => {
    return {
        value: staff.id,
        label: `${staff.attributes.first_name} ${staff.attributes.last_name}`
    };
});

describe('StaffDropdown component: ', () => {
    const { component } = setup({ 
        onStaffChange,
        staff,
        isLoading: false,
        selectedStaff: 0
    });

    it('should render the select component with staffs and onStaffChange to be called', () => {
        let props = component.find('Select').props();
        expect(props).to.have.property('options', staff);
        component.find('Select').simulate('change');
        expect(onStaffChange.called).to.be.true;
    });

    it('should render the select component loading indicator', () => {
        const { component } = setup({ 
            onStaffChange,
            staff,
            isLoading: true,
            selectedStaff: 0
        });

        let props = component.find('Select').props();
        expect(props).to.have.property('isLoading', true);
    });

    it('should render the select component with selectedStaff', () => {
        const { component } = setup({ 
            onStaffChange,
            staff,
            isLoading: true,
            selectedStaff: 77
        });

        let props = component.find('Select').props();
        expect(props.value).to.have.eql(77);
    });

});