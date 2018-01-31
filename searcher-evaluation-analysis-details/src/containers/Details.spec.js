import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Details } from './Details';
import Loader from '../components/Loader';
import ViewSelector from '../components/ViewSelector';
import ComparisonTable from './ComparisonTable';

const setup = props => {
    const component = shallow(<Details {...props} />);

    return { component };
};

const criterion = {
    id: 1,
    title: 'Experience',
    weight: 50,
    isOpen: false,
    currentTab: 'responses',
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
    ],
    dispatch: () => {}
};

describe('Details container: ', () => {
    const props = {
        dispatch: sinon.spy(),
        criteria: [criterion, { ...criterion, id: 2 }],
        currentView: 'single',
        isLoading: true,
        staffAssignee: 'Troy Redden',
        staffAssigneeId: 1,
        expandAll: false,
        canViewAll: true,
        error: ''
    };

    let { component } = setup(props);

    it('should be able to show Loader indicator', () => {
        expect(component.find(Loader)).to.have.length(1);
    });

    it('should be able to render ViewSelector with correct props', () => {
        let { component } = setup({ ...props, isLoading: false });
        let viewSelector = component.find(ViewSelector);
        expect(viewSelector).to.have.length(1);
        expect(viewSelector.props()).to.have.property('view', 'single');
    });

    it('should be able to show error message', () => {
        let { component } = setup({
            ...props,
            error: 'Something went wrong. Please try again later'
        });

        expect(component.find('.bs-callout-danger')).to.have.length(1);
    });

    it('should be able to render criteria', () => {
        let { component } = setup({
            ...props,
            isLoading: false,
            currentView: 'single'
        });
        expect(component.find('.criteria-list').children()).to.have.length(
            props.criteria.length
        );
    });

    it('should be able to render ComparisonTable', () => {
        let { component } = setup({
            ...props,
            isLoading: false,
            currentView: 'compare'
        });

        expect(component.find(ComparisonTable)).to.have.length(1);
    });
});
