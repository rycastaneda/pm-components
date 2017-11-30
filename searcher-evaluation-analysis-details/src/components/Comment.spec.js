import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Comment from './Comment';

const setup = props => {
    const component = mount(<Comment {...props} />);

    return { component };
};

describe('Comment component: ', () => {
    const props = {
        staff: 'Reese',
        comment: 'Company size is too small, still considering',
        score: 1
    };
    const { component } = setup(props);

    it('should be able to render the Comment with props', () => {
        expect(component.find('.commentbox > .staff').text()).to.eql(
            props.staff
        );
        expect(component.find('.commentbox > .comment').text()).to.eql(
            props.comment
        );
        expect(+component.find('.commentbox > .score').text()).to.eql(
            props.score
        );
    });
});
