import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Question from './Question';

const setup = props => {
    const component = shallow(<Question {...props} />);

    return { component };
};

describe('Question component: ', () => {
    it('should render the question with the answer', () => {
        const { component } = setup({
            question: 'What is your favorite food?',
            answer: 'Pizza'
        });

        expect(component.find('p').text()).to.contain(
            'What is your favorite food?'
        );
        expect(component.find('span').text()).to.eql('Pizza');
    });
});
