import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import AssignmentRow from './AssignmentRow';

const setup = props => {
    const component = mount(<AssignmentRow {...props} />);

    return { component };
};

const toggleCommentsModal = sinon.spy();

describe('AssignmentRow component: ', () => {
    const props = {
        id: 1,
        section: 'Section',
        assignee: 'Test Assignee',
        status: 'Pending',
        lastUpdated: '' + new Date(),
        commentCount: 1,
        toggleCommentsModal
    };

    it('should be able to render the AssignmentRow with props', () => {
        const { component } = setup(props);
        expect(component.find('td')).to.have.length(5);
    });

    it('should be able to call toggleCommentsModal', function() {
        const { component } = setup(props);
        component.find('.fa-comments').simulate('click');
        expect(toggleCommentsModal.called).to.be.true;
    });

    it('should be able to call toggleCommentsModal', function() {
        const { component } = setup(props);
        component.find('.fa-comments').simulate('click');
        expect(toggleCommentsModal.called).to.be.true;
    });

    it('should be able to call toggleCommentsModal', function() {
        const { component } = setup({ ...props, commentCount: 0 });
        expect(component.find('.comments').text()).to.eql('No Comments');
    });
});
