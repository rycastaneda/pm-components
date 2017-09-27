import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import NewComment from './NewComment';

const setup = (props) => {
    const component = mount(
        <NewComment {...props} />
    );

    return { component };
};

const submitComment =  sinon.spy();
const cancelNewComment =  sinon.spy();

describe('NewComment component: ', () => {
    let { component } = setup({ 
        comment: 'Company size is too small, still considering',
        submitComment,
        cancelNewComment
    });

    it('should be able to render the form to add new comment and be able to submit', () => {
        expect(component.find('textarea').text()).to.contain('Company size is too small, still considering');
        component.setProps({ comment: 'New Comment' });
        expect(component.find('textarea').text()).to.contain('New Comment');

        component.simulate('submit');
        expect(submitComment).to.have.property('callCount', 1);
    });

    it('should be able to cancel editing', () => {
        let { component } = setup({ 
            comment: 'Company size is too small, still considering',
            submitComment,
            cancelNewComment
        });

        component.find('.cancel').simulate('click');
        expect(cancelNewComment).to.have.property('callCount', 1);
    });
});