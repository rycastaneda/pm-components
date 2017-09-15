import React from 'react';
import { shallow } from 'enzyme';
import IconPicker from './IconPicker';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <IconPicker {...props} />
    );
    return { component };
};
const onChange = () => {};

describe('IconPicker component: ', () => {
    it('should render initial state', () => {
        const { component } = setup({ id: 1,  icon: 'fa-arrow-right', onChange });
        expect(component.find('.icon-picker button.btn')).to.have.length(1);
        expect(component.find('.icon-picker .popover.show')).to.have.length(0);
    });

    it('should render open state when clicked', () => {
        const { component } = setup({ id: 1,  icon: 'fa-arrow-right', onChange });
        component.find('.icon-picker .btn').simulate('click');
        expect(component.find('.icon-picker .popover.show')).to.have.length(1);
        expect(component.find('.icon-picker .popover.show .icon-group')).to.have.length(1);
        expect(component.find('.icon-picker .popover .icon-group a.icon-item').length).to.be.at.least(1);
        expect(component.find('.icon-picker .popover.show .cover')).to.have.length(1);
    });

    it('should close and dispatch change when closed', () => {
        const { component } = setup({ id: 1,  icon: 'fa-arrow-right', onChange });
        component.find('.icon-picker .btn').simulate('click');
        expect(component.find('.icon-picker .popover.show .cover')).to.have.length(1);
        component.find('.cover').simulate('click');
        expect(component.find('.icon-picker button.btn')).to.have.length(1);
        expect(component.find('.icon-picker popover.show')).to.have.length(0);
    });
});
