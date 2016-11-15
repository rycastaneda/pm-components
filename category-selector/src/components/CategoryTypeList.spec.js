import React from 'react';
import { shallow } from 'enzyme';
import CategoryTypeList from './CategoryTypeList';
import { expect } from 'chai';

const props = {
    types: [
        {
            id: 2,
            attributes: {
                title: 'Trades'
            }
        },
        {
            id: 3,
            attributes: {
                title: 'Books'
            }
        }],
    onTypeClick: function() {
    },
    selected: 'Books',
    isFetching: false
};

const component = shallow(
    <CategoryTypeList {...props} />
);

describe('CategoryTypeList component: ', () => {
    it('should render props and initial markup correctly', () => {

        expect(component.node.type).to.equal('div');
        expect(component.node.props.children).is.an('object');
        expect(component.node.props.children.type).to.equal('ul');
        expect(component.node.props.children.props.className).to.have.string('category-types');
    });

    it('should render the list of category types correctly', () => {
        expect(component.node.props.children.props.children).is.an('array');
        expect(component.node.props.children.props.children.length).to.equal(2);
    });

    it('should render selected category type correctly', () => {
        expect(component.node.props.children.props.children[1].props.selected).to.equal(true);
        expect(component.node.props.children.props.children[0].props.selected).to.not.equal(true);
    });
});
