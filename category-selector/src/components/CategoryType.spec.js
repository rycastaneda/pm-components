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
        const { component } = setup({ id: 1, attributes: { title: 'Test' }, onClick });

        expect(component.text()).to.equal('Test');
        expect(component.prop('id')).to.equal(1);
        expect(component.prop('onClick')).to.equal(onClick);
        expect(component.prop('children')).is.an('array');
        // Doesn't have selected state
        expect(component.prop('className')).to.not.have.string('selected');
        // Spinner is empty
        expect(component.prop('children')[1]).is.a('string');
    });

    it('should render selected state correctly by having "selected" class and empty spinner', () => {
        const selected = true;
        const { component } = setup({ id: 1, attributes: { title: 'Test' }, onClick, selected });

        expect(component.prop('className')).to.have.string('selected');
    });

    it('should render a spinner', () => {
        const selected = true;
        const isFetching = true;
        const { component } = setup({ id: 1, attributes: { title: 'Test' }, onClick, selected, isFetching });

        expect(component.prop('children')).is.an('array');
        expect(component.prop('children')[1].type).to.equal('i');
        expect(component.prop('children')[1].props.className).to.equal('category-types__spinner fa fa-spinner fa-spin');
    });
});
