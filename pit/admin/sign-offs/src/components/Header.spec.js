import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Header from './Header';
import TabHeader from './TabHeader';

const setup = (props) => {
    const component = shallow(
        <Header {...props} />
    );

    return { component };
};

const switchSectionTab = sinon.spy();

describe('Header component: ', () => {
    it('should render the tab indicators and the counters', () => {
        const { component } = setup({ 
            currentTab: 'questions',
            switchSectionTab
        });

        expect(component.find(TabHeader)).to.have.length(2);
    });
});