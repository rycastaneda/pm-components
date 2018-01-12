import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Question from './Question';
import Comment from './Comment';

const setup = props => {
    const component = shallow(<Question {...props} />);

    return { component };
};

describe('Question component: ', () => {
    let component;
    const props = {
        questionTitle: 'Test Question',
        totalScore: 5,
        scale: 5,
        comments: [
            {
                id: 1,
                staff: 'Reese',
                comment: 'Company size is too small, still considering',
                score: 5
            },
            {
                id: 2,
                staff: 'Kitkat',
                comment: 'Agree with comment above',
                score: 5
            }
        ]
    };

    it('should render the Question with title, score, comments', () => {
        const { component } = setup(props);

        expect(component.find('.question-title').text()).to.eql(
            props.questionTitle
        );
        expect(+component.find('.label-plantminer').text()).to.eql(
            props.totalScore
        );
        expect(component.find('.fa-chevron-right'));
        expect(component.find(Comment)).to.have.length(0);
    });

    it('should render the Question without score if scale is 1', () => {
        const { component } = setup({
            ...props,
            scale: 1
        });

        expect(component.find('.question-title').text()).to.eql(
            props.questionTitle
        );
        expect(component.find('.label-plantminer')).to.have.length(0);
        expect(component.find('.fa-chevron-right'));
        expect(component.find(Comment)).to.have.length(0);
    });

    it('should be able to expand to show comments', () => {
        const { component } = setup(props);

        component.find('.toggle-comments').simulate('click');
        expect(component.find('.fa-chevron-down'));
        expect(component.find(Comment)).to.have.length(props.comments.length);
    });
});
