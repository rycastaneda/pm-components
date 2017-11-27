import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Criterion from './Criterion';
import Report from '../components/Report';
import Question from '../components/Question';
import Header from '../components/Header';

const setup = props => {
    const component = shallow(<Criterion {...props} />);

    return { component };
};

const componentProps = {
    id: 1,
    title: 'Experience',
    weight: 50,
    questions: [
        {
            id: 1,
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
        },
        {
            questionTitle: 'Test Question',
            totalScore: 2,
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
        }
    ],
    reports: [
        {
            staff: 'Reese',
            scores: [5, 10, 15, 20]
        },
        {
            staff: 'Kitkat',
            scores: [25, 30, 35, 40]
        }
    ]
};

describe('Assignment container: ', () => {
    const { component } = setup(componentProps);

    it('should render title and weight and should be closed by default', () => {
        expect(component.find('.pmaccordion__title').text()).to.eql(
            componentProps.title
        );
        expect(+component.find('.weight').text()).to.eql(componentProps.weight);
        expect(component.find('.in')).to.have.length(0);
        expect(component.find('.toggle-section').hasClass('collapsed')).to.be
            .false;
    });

    it('should render Header with props', () => {
        const header = component.find(Header);
        expect(header).to.have.length(1);
        const props = header.props();
        console.log('props', props); // eslint-disable-line quotes, no-console
        expect(props).to.have.property('currentTab', 'responses');
    });

    it('should be able to expand the accordion', () => {
        let toggle = component.find('.toggle-section');
        toggle.simulate('click');
        component.setState({ open: true });
        expect(component.find('.in')).to.have.length(1);
        expect(component.find('.toggle-section').hasClass('collapsed')).to.be
            .true;
    });

    it('should render toggle tabs between questions and reports', () => {
        expect(component.find(Question)).to.have.length(
            componentProps.questions.length
        );

        component.setState({
            open: true,
            tab: 'reports'
        });

        expect(component.find(Question)).to.have.length(0);
        expect(component.find(Report)).to.have.length(1);
    });
});
