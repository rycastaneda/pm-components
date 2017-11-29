import React from 'react';

import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ViewSelector from './ViewSelector';

const changeView = sinon.spy();

describe('ViewSelector component: ', () => {
    let component;
    const props = {
        view: 'single',
        changeView
    };

    it('should render the ViewSelector with the active view', () => {
        component = mount(<ViewSelector {...props} />);

        expect(component.find('.btn-default').text()).to.eql('Single');
    });

    it('should be able to change view after clicking', () => {
        let allButton = component.find('#all');

        allButton.simulate('click');
        expect(changeView.called).to.be.true;
    });
});
