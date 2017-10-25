import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Status from './Status';

const setup = (props) => {
    const component = shallow(
        <Status {...props} />
    );

    return { component };
};

const toggleSectionStatus = sinon.spy();

describe('Status component: ', () => {
    const { component } = setup({ 
        status: 'approved', 
        toggleSectionStatus
    });

    it('should render status name and its toggle function function', () => {
        let props = component.find('Select').props();
        expect(props).to.have.property('value', 'approved');
        component.find('Select').simulate('change');
        expect(toggleSectionStatus.called).to.be.true;
    });

});