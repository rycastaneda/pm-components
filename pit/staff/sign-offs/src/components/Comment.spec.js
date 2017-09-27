import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Comment from './Comment';

const setup = (props) => {
    const component = mount(
        <Comment {...props} />
    );

    return { component };
};

const toggleCommentEdit = sinon.spy();

describe('Comment component: ', () => {
    const { component } = setup({ 
        staff: 'Reese',
        comment: 'Company size is too small, still considering',
        date: `09-17-2017 9:20:00 AM`,
        toggleCommentEdit,
        isReadOnly: false
    });

    it('should be able to render the Comment with props and toggleCommentEdit function', () => {
        expect(component.find('.request-detail').text()).to.contain('Company size is too small, still considering');
        component.find('.edit').simulate('click');
        expect(toggleCommentEdit).to.have.property('callCount', 1);
        expect(component.find('.staff').text()).to.contain('Reese');
    });

    it('should be able to not edit comment its read-only', () => {
        const { component: wrapper } = setup({ 
            staff: 'Reese',
            comment: 'Company size is too small, still considering',
            date: `09-17-2017 9:20:00 AM`,
            toggleCommentEdit,
            isReadOnly: true
        });
        expect(wrapper.find('.edit')).to.have.length(0);
    });

});