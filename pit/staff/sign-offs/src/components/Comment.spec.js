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
const deleteComment = sinon.spy();

describe('Comment component: ', () => {
    const { component } = setup({ 
        staff: 'Reese',
        comment: 'Company size is too small, still considering',
        date: `09-17-2017 9:20:00 AM`,
        toggleCommentEdit,
        deleteComment,
        isReadOnly: false
    });

    it('should be able to render the Comment with props and toggleCommentEdit function', () => {
        expect(component.find('p').text()).to.contain('Company size is too small, still considering');
        component.find('.change-comment').simulate('click');
        expect(toggleCommentEdit).to.have.property('callCount', 1);
        expect(component.find('.staff').text()).to.contain('Reese');
    });

    it('should be able to not edit comment its read-only', () => {
        const { component: wrapper } = setup({ 
            staff: 'Reese',
            comment: 'Company size is too small, still considering',
            date: `09-17-2017 9:20:00 AM`,
            toggleCommentEdit,
            deleteComment,
            isReadOnly: true
        });
        expect(wrapper.find('.change-comment')).to.have.length(0);
    });

    it('should be able to delete the comment', () => {
        const { component: wrapper } = setup({ 
            staff: 'Reese',
            comment: 'Company size is too small, still considering',
            date: `09-17-2017 9:20:00 AM`,
            toggleCommentEdit,
            deleteComment,
            isReadOnly: false
        });

        expect(wrapper.find('.delete-comment')).to.have.length(1);
        component.find('.delete-comment').simulate('click');
        expect(deleteComment).to.have.property('callCount', 1);
    });

});