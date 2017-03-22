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
    it('should render select wrapper and default 3 options with \'onlyService\' being default value', () => {
        const { component } = setup({ handleChange, quote_request_id: '1234' });

        expect(component.node.type).to.equal('select');
        expect(component.props().onChange).to.equal(handleChange);
        expect(component.props().children.length).to.equal(4);
        expect(component.props().children[0].type).to.equal('option');
        expect(component.props().children[1].type).to.equal('option');
        expect(component.props().children[2].type).to.equal('option');
        expect(component.props().children[3]).to.equal(null);
        expect(component.props().defaultValue).to.equal('onlyService');
    });

    it('should render select wrapper and default 3 options with \'onlyQR\' being default value', () => {
        const { component } = setup({ handleChange, include: false, quote_request_id: 'null' });

        expect(component.node.type).to.equal('select');
        expect(component.props().onChange).to.equal(handleChange);
        expect(component.props().children.length).to.equal(4);
        expect(component.props().children[0].type).to.equal('option');
        expect(component.props().children[1].type).to.equal('option');
        expect(component.props().children[2].type).to.equal('option');
        expect(component.props().children[3]).to.equal(null);
        expect(component.props().defaultValue).to.equal('onlyQR');
    });

    it('should render select wrapper and default 3 options with \'all\' being default value', () => {
        const { component } = setup({ handleChange, include: true, quote_request_id: 'null' });

        expect(component.node.type).to.equal('select');
        expect(component.props().onChange).to.equal(handleChange);
        expect(component.props().children.length).to.equal(4);
        expect(component.props().children[0].type).to.equal('option');
        expect(component.props().children[1].type).to.equal('option');
        expect(component.props().children[2].type).to.equal('option');
        expect(component.props().children[3]).to.equal(null);
        expect(component.props().defaultValue).to.equal('all');
    });

    it('should render select wrapper and default 3 options plus an additional option passed as param', () => {
        const { component } = setup({ handleChange, category_id: '22', include: true, options });

        expect(component.node.type).to.equal('select');
        expect(component.props().children.length).to.equal(4);
        expect(component.props().children[3].length).to.equal(1);
        expect(component.props().children[3][0].type).to.equal('option');
        expect(component.props().children[3][0].props.value).to.equal('22');
        expect(component.props().children[3][0].props.children).to.equal('any test');
        expect(component.props().defaultValue).to.equal('22');
    });
});
