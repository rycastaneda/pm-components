import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CommentModal from './CommentModal';
import Comment from '../components/Comment';

const toggleCommentModal = sinon.spy();
const fetchComments = sinon.spy();

const setup = props => {
    const component = mount(<CommentModal {...props} />);

    return { component };
};

describe('CommentModal component: ', () => {
    const props = {
        assignment: {
            id: 1,
            comments: [{
                id: 1,
                staff: 'tester',
                text: 'test',
                date: new Date()
            }],
            commentCount: 1
        },
        toggleCommentModal,
        fetchComments
    };

    it('should be able to render the CommentModal with props', () => {
        const { component } = setup(props);
        expect(component.find('.modal-content')).to.have.length(1);
    });

    it('should be able to render the Comment component', () => {
        const { component } = setup(props);
        expect(component.find(Comment)).to.have.length(1);
    });

    it('should be able to toggleCommentModal back', () => {
        const { component } = setup(props);
        component.find('.close').simulate('click');
        component.find('.db-function').simulate('click');
        expect(toggleCommentModal.callCount).to.eql(2);

    });
});
