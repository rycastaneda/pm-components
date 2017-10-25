import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import TabHeader from './TabHeader';

const setup = (props) => {
    const component = shallow(
        <TabHeader {...props} />
    );

    return { component };
};

const switchSectionTab = sinon.spy();

describe('TabHeader component: ', () => {
    const { component } = setup({ 
        text: 'Questions',
        active: true,
        switchSectionTab
    });

    it('should render the tab indicator and text', () => {
        expect(component.text()).to.eql('Questions');
        expect(component.find('i').hasClass('fa-chevron-down'));
    });

    it('should change the indicator to open after clicking a tab', () => {
        component.simulate('click');
        expect(switchSectionTab).to.have.property('callCount', 1);
        expect(component.find('i').hasClass('fa-chevron-right'));
    });
});