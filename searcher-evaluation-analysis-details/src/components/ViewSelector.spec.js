import React from 'react';

import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ViewSelector from './ViewSelector';

const changeView = sinon.spy();

const setup = props => {
    const component = mount(<ViewSelector {...props} />);

    return { component };
};

describe('ViewSelector component: ', () => {
    const props = {
        view: 'single',
        changeView,
        canViewAll: true
    };

    it('should render the ViewSelector with the active view', () => {
        const { component } = setup(props);

        expect(component.find('.btn-default').text()).to.eql('Single');
    });

    it('should be able to change view after clicking', () => {
        const { component } = setup(props);
        let allButton = component.find('#all');

        allButton.simulate('click');
        expect(changeView.called).to.be.true;
    });

    it('should not be able to select ALL view if user dont have access', () => {
        const { component } = setup({ ...props, canViewAll: false });

        expect(component.find('#all')).to.have.length(0);
    });
});
