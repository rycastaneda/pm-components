import React from 'react';
import { shallow } from 'enzyme';
import ColorPicker from './ColorPicker';
import { ChromePicker  } from 'react-color';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <ColorPicker {...props} />
    );
    return { component };
};
const onChange = () => {};

describe('ColorPicker component: ', () => {
    it('should render initial state', () => {
        const { component } = setup({ id: 1,  color: '#ff0000', onChange });
        expect(component.find('.color-picker')).to.have.length(1);
        expect(component.find('.color-picker button.btn')).to.have.length(1);
        expect(component.find('.color-picker .popover.show')).to.have.length(0);
    });

    it('should render open state when clicked', () => {
        const { component } = setup({ id: 1,  color: '#ff0000', onChange });
        component.find('.btn').simulate('click');
        expect(component.find('.color-picker .popover.show')).to.have.length(1);
        expect(component.find(ChromePicker)).to.have.length(1);
        expect(component.find('.color-picker .popover.show .cover')).to.have.length(1);
    });

    it('should close and dispatch change when closed', () => {
        const { component } = setup({ id: 1,  color: '#ff0000', onChange });
        component.find('.btn').simulate('click');
        expect(component.find('.color-picker .popover.show .cover')).to.have.length(1);
        component.find('.color-picker .popover .cover').simulate('click');
        expect(component.find('.color-picker button.btn')).to.have.length(1);
        expect(component.find('.color-picker .popover.show')).to.have.length(0);
    });
});
