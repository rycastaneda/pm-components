import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Staff from './Staff';
import Loader from './Loader';

const setup = props => {
    const component = shallow(<Staff {...props} />);

    return { component };
};

const toggleSectionStatus = sinon.spy();
const deleteStaffResponse = sinon.spy();

describe('Staff component: ', () => {
    const { component } = setup({
        name: 'Tester',
        statusId: 0,
        toggleSectionStatus,
        deleteStaffResponse,
        isLoading: false
    });

    it('should render staff name', function() {
        expect(component.find('label').text()).to.be.eql('Tester');
    });

    it('should render the loader', function() {
        const { component } = setup({
            name: 'Tester',
            statusId: 0,
            toggleSectionStatus,
            deleteStaffResponse,
            isLoading: true
        });

        expect(component.find(Loader)).to.be.not.undefined;
    });

    it('should render the delete button and its click function', function() {
        component.find('.delete-staff').simulate('click');
        expect(deleteStaffResponse.called).to.be.true;
    });

    it('should render status and its toggleSectionStatus function', () => {
        let props = component.find('Select').props();
        expect(props).to.have.property('value', 0);
        component.find('Select').simulate('change');
        expect(toggleSectionStatus.called).to.be.true;
    });

    it('should now remove the delete button after its approved', function() {
        const { component } = setup({
            name: 'Tester',
            statusId: 2,
            toggleSectionStatus,
            deleteStaffResponse,
            isLoading: true
        });

        expect(component.find('.delete-staff')).to.have.length(0);
    });
});
