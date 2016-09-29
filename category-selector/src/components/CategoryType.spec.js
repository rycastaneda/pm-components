import React from 'react';
import { shallow } from 'enzyme';
import CategoryType from './CategoryType';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <CategoryType {...props} />
    );

    return { component };
};

const onClick = () => true;

describe('CategoryType component: ', () => {
    it('should render attributes, id and initial state ', () => {
        const selected = false;
        const { component } = setup({ id: 1, attributes: { title: 'Test' }, onClick, selected });

        expect(component.text()).to.equal('Test');
        expect(component.prop('id')).to.equal(1);
        expect(component.prop('onClick')).to.equal(onClick);
        expect(component.prop('className')).to.not.have.string('selected');
    });

    it('should render selected state correctly by having "selected" class', () => {
        const selected = true;
        const { component } = setup({ id: 1, attributes: { title: 'Test' }, onClick, selected });

        expect(component.prop('className')).to.have.string('selected');
    });
});
