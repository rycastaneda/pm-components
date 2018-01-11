import React from 'react';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Header from './Header';

const changeTab = sinon.spy();

describe('Header component: ', () => {
    let component;
    let props = {
        currentView: 'single',
        currentTab: 'responses',
        changeTab
    };

    it('should render the currentTab with correct class', () => {
        component = shallow(<Header {...props} />);

        component.find(`#${props.currentTab}`).hasClass('selected');
    });

    it('should be able to change tab after clicking', () => {
        let tab = component.find(`#${props.currentTab}`);

        tab.simulate('click');
        expect(changeTab.called).to.be.true;
    });

    it('should show the reports tab on all tab', () => {
        props = {
            currentView: 'all',
            currentTab: 'responses',
            changeTab
        };

        component = shallow(<Header {...props} />);

        let tab = component.find(`#${props.currentTab}`);
        expect(tab).to.have.length(1);
    });
});
