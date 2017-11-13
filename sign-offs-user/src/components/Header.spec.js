import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Header from './Header';
import TabHeader from './TabHeader';
import Status from './Status';

const setup = props => {
    const component = shallow(<Header {...props} />);

    return { component };
};

const toggleSectionStatus = sinon.spy();
const switchSectionTab = sinon.spy();

describe('Header component: ', () => {
    it('should render the tab indicators and the status selector', () => {
        const { component } = setup({
            currentTab: 'questions',
            statusId: 2,
            switchSectionTab,
            toggleSectionStatus,
            isReadOnly: false,
            isLoading: false
        });

        expect(component.find(TabHeader)).to.have.length(2);
        expect(component.find(Status)).to.have.length(1);
    });

    it('should not show the status selector if its read only', () => {
        const { component } = setup({
            currentTab: 'questions',
            statusId: 2,
            switchSectionTab,
            toggleSectionStatus,
            isReadOnly: true,
            isLoading: false
        });

        expect(component.find(TabHeader)).to.have.length(2);
        expect(component.find(Status)).to.have.length(0);
    });

    it('should not show the status selector if status is empty', () => {
        const { component } = setup({
            currentTab: 'questions',
            statusId: null,
            switchSectionTab,
            toggleSectionStatus,
            isReadOnly: true,
            isLoading: false
        });

        expect(component.find(TabHeader)).to.have.length(2);
        expect(component.find(Status)).to.have.length(0);
    });
});
