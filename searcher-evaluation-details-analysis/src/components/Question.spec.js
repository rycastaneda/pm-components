import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Question from './Question';
import Comment from './Comment';

describe('Question component: ', () => {
    let component;
    const props = {
        questionTitle: 'Test Question',
        totalScore: 5,
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
        component = shallow(<Question {...props} />);

        expect(component.find('.question-title').text()).to.eql(
            props.questionTitle
        );
        expect(+component.find('.scorebox').text()).to.eql(props.totalScore);
        expect(component.find('.fa-chevron-right'));
        expect(component.find(Comment)).to.have.length(0);
    });

    it('should be able to expand to show comments', () => {
        component.find('.toggle-comments').simulate('click');
        expect(component.find('.fa-chevron-down'));
        expect(component.find(Comment)).to.have.length(props.comments.length);
    });
});
