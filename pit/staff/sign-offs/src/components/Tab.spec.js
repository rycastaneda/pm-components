import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Tab from './Tab';

const setup = (props) => {
    const component = shallow(
        <Tab {...props} />
    );

    return { component };
};

const toggleTab = sinon.spy();

describe('Tab component: ', () => {
    const { component } = setup({ 
        text: 'Questions',
        active: true,
        toggleTab
    });

    it('should render the tab indicator and text', () => {
        expect(component.text()).to.eql('Questions');
        expect(component.find('i').hasClass('fa-chevron-down'));
    });

    it('should change the indicator to open after clicking a tab', () => {
        component.simulate('click');
        expect(toggleTab).to.have.property('callCount', 1);
        expect(component.find('i').hasClass('fa-chevron-right'));
    });
});