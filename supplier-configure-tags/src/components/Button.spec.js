import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <Button {...props} />
    );

    return { component };
};

const onClick = () => true;

describe('Button component: ', () => {
    it('should render title and onclick function', () => {
        const { component } = setup({ title: 'My button', onClick });

        expect(component.text()).to.contain('My button');
        expect(component.find('button')).to.have.length(1);
        expect(component.prop('onClick')).to.equal(onClick);
    });
});