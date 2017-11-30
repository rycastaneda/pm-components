import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import StatusDropdown from './StatusDropdown';

const setup = (props) => {
    const component = shallow(
        <StatusDropdown {...props} />
    );

    return { component };
};

const onStatusChange = sinon.spy();

describe('StatusDropdown component: ', () => {
    const { component } = setup({ 
        onStatusChange,
        selectedStatus: [0]
    });


    it('should render the select component', () => {
        let props = component.find('Select').props();
        expect(props.value).to.eql([0]);
    });

});