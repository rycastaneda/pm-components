import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Header from './Header';
import Tab from './Tab';
import Status from './Status';

const setup = (props) => {
    const component = shallow(
        <Header {...props} />
    );

    return { component };
};

const toggleStatus = sinon.spy();
const toggleTab = sinon.spy();

describe('Header component: ', () => {
    it('should render the tab indicators and the status selector', () => {
        const { component } = setup({ 
            currentTab: 'questions',
            status: 'approved',
            toggleTab,
            toggleStatus,
            isReadOnly: false
        });

        expect(component.find(Tab)).to.have.length(2);
        expect(component.find(Status)).to.have.length(1);
    });

    it('should not show the status selector if its read only', () => {
        const { component } = setup({ 
            currentTab: 'questions',
            status: 'approved',
            toggleTab,
            toggleStatus,
            isReadOnly: true
        });

        expect(component.find(Tab)).to.have.length(2);
        expect(component.find(Status)).to.have.length(0);
    });

});