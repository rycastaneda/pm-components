import React from 'react';
import { shallow } from 'enzyme';
import InclusionSelection from './InclusionSelection';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <InclusionSelection {...props} />
    );

    return { component };
};

const handleChange = () => true;
const options = [
    {
        id: 1,
        selectedCategory: {
            id: '22'
        },
        input: 'test'
    }
];

describe('Inclusions selection component: ', () => {
    it('should render select wrapper and default 2 options with \'none\' being default value', () => {
        const { component } = setup({ handleChange });

        expect(component.node.type).to.equal('select');
        expect(component.props().onChange).to.equal(handleChange);
        expect(component.props().children.length).to.equal(3);
        expect(component.props().children[0].type).to.equal('option');
        expect(component.props().children[1].type).to.equal('option');
        expect(component.props().children[2]).to.equal(null);
        expect(component.props().defaultValue).to.equal('none');
    });

    it('should render select wrapper and default 2 options with \'all\' being default value', () => {
        const { component } = setup({ handleChange, include: true });

        expect(component.node.type).to.equal('select');
        expect(component.props().onChange).to.equal(handleChange);
        expect(component.props().children.length).to.equal(3);
        expect(component.props().children[0].type).to.equal('option');
        expect(component.props().children[1].type).to.equal('option');
        expect(component.props().children[2]).to.equal(null);
        expect(component.props().defaultValue).to.equal('all');
    });

    it('should render select wrapper and default 2 options plus an additional option passed as param', () => {
        const { component } = setup({ handleChange, category_id: '22', include: true, options });

        expect(component.node.type).to.equal('select');
        expect(component.props().children.length).to.equal(3);
        expect(component.props().children[2].length).to.equal(1);
        expect(component.props().children[2][0].type).to.equal('option');
        expect(component.props().children[2][0].props.value).to.equal('22');
        expect(component.props().children[2][0].props.children).to.equal('any test');
        expect(component.props().defaultValue).to.equal('22');
    });
});
