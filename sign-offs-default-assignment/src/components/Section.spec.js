import React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';
import { expect } from 'chai';
import sinon from 'sinon';

const setup = props => {
    const component = shallow(<Section {...props} />);

    return { component };
};

const toggleCollapse = sinon.spy();

describe('Section component: ', () => {
    it('should render title', () => {
        const { component } = setup({
            id: '1',
            isLoading: false,
            title: 'My Section',
            isCollapsed: false,
            defaultUsers: [],
            toggleCollapse
        });

        expect(component.find('.section-title').text()).to.eql('My Section');
    });

    it('should collapse the section after clicking title', () => {
        const { component } = setup({
            id: '1',
            isLoading: false,
            title: 'My Section',
            isCollapsed: true,
            defaultUsers: [],
            toggleCollapse
        });

        component.find('.toggle-section').simulate('click');
        expect(toggleCollapse).to.have.property('callCount', 1);
        expect(component.find('.collapse').hasClass('in')).to.be.true;
    });
});
