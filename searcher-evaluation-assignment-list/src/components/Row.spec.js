import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Row from './Row';

const setup = props => {
    const component = mount(<Row {...props} />);

    return { component };
};

const toggleCommentsModal = sinon.spy();

describe('Row component: ', () => {
    const props = {
        id: 1,
        supplier: 'Test Supplier',
        panels: 'Test Panels',
        section: 'Section',
        assignee: 'Test Assignee',
        status: 'Pending',
        lastUpdated: '' + new Date(),
        comments: [],
        toggleCommentsModal
    };
    const { component } = setup(props);


    it('should be able to render the Row with props', () => {
        expect(component.find('td')).to.have.length(7);
    });

    it('should be able to call toggleCommentsModal', function() {
        component.find('.fa-comments').simulate('click');
        expect(toggleCommentsModal.called).to.be.true;
    });
});


