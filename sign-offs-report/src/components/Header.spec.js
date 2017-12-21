import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Header from './Header';

const setup = props => {
    const component = mount(<Header {...props} />);

    return { component };
};
const onClick = sinon.spy();

describe('Header component: ', () => {
    it('should be able to render the Header with correct direction icon and should be clickable', () => {
        const props = {
            text: 'Supplier',
            field: 'supplier',
            direction: `asc`,
            sortable: true,
            onClick
        };
        const { component } = setup(props);

        expect(component.text()).to.contain(props.text);
        expect(component.find('.th-sort-asc').hasClass('th-sort-asc')).to.be
            .true;
        component.simulate('click');
        expect(onClick.called).to.be.true;
    });

    it('should be able to render the Header with no direction icon', () => {
        const props = {
            text: 'Supplier',
            field: 'comment',
            direction: `asc`,
            sortable: false,
            onClick
        };
        const { component } = setup(props);

        expect(component.text()).to.contain(props.text);
        expect(component.hasClass('th-sort-asc')).to.be.false;
    });
});
