import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Staff from './Staff';

const setup = (props) => {
    const component = shallow(
        <Staff {...props} />
    );

    return { component };
};

const toggleSectionStatus = sinon.spy();
const deleteStaff = sinon.spy();

describe('Staff component: ', () => {
    const { component } = setup({ 
        name: 'Tester',
        status: 'approved', 
        toggleSectionStatus,
        deleteStaff
    });

    it('should render staff name', function() {
        expect(component.find('label').text()).to.be.eql('Tester');
    });

    it('should render status and its toggletoggleSectionStatus function', () => {
        let props = component.find('Select').props();
        expect(props).to.have.property('value', 'approved');
        component.find('Select').simulate('change');
        expect(toggleSectionStatus.called).to.be.true;
    });

    it('should render the delete button and its click function', function() {
        component.find('.delete-staff').simulate('click');
        expect(deleteStaff.called).to.be.true;
    });

});