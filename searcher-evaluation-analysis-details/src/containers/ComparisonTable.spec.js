import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ComparisonTable } from './ComparisonTable';
import ComparisonRow from '../components/ComparisonRow';

const setup = props => {
    const component = shallow(<ComparisonTable {...props} />);

    return { component };
};

const componentProps = {
    criteria: [
        {
            id: 1,
            questionIds: [1, 2, 3],
            title: 'New Criteria',
            weight: 100,
            isOpen: false,
            currentTab: 'responses',
            questions: [
                {
                    id: 1,
                    questionTitle: 'New Question',
                    totalScore: 4.2,
                    scale: 5,
                    commentIds: [3, 5, 4, 1, 2],
                    comments: [{}, {}, {}, {}, {}]
                },
                {
                    id: 2,
                    questionTitle: 'New Question 2',
                    totalScore: 2.4,
                    scale: 5,
                    commentIds: [7, 9, 10, 8, 6],
                    comments: [{}, {}, {}, {}, {}]
                },
                {
                    id: 3,
                    questionTitle: 'New Question 3',
                    totalScore: 4,
                    scale: 5,
                    commentIds: [12, 14, 15, 13, 11],
                    comments: [{}, {}, {}, {}, {}]
                }
            ]
        }
    ],
    entities: [{}, {}, {}],
    dispatch: () => {}
};

describe('ComparisonTable container: ', () => {
    const { component } = setup(componentProps);

    it('should render table headers with criteria with user and total', () => {
        const headers = component.find('th');
        let counter = 1;
        expect(headers.at(0).text()).to.eql('User');
        componentProps.criteria.map(criteria => {
            expect(headers.at(counter).text()).to.eql(
                `${criteria.title} (${criteria.weight})`
            );
            counter++;
        });
        expect(headers.at(counter).text()).to.eql('Total (100)');
    });

    it('should render Component Rows', () => {
        const rows = component.find(ComparisonRow);
        expect(rows).to.have.length(componentProps.entities.length);
    });
});
