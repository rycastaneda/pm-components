import React from 'react';

import { mount } from 'enzyme';
import { expect } from 'chai';
import ComparisonTable from './ComparisonTable';
import ComparisonRow from './ComparisonRow';

const setup = props => {
    const component = mount(<ComparisonTable {...props} />);

    return { component };
};

describe('ComparisonTable component: ', () => {
    const props = {
        criteria: [
            {
                id: 1,
                title: 'Heath and Safety'
            },
            {
                id: 2,
                title: 'Financial Security'
            },
            {
                id: 3,
                title: 'Environment'
            }
        ],
        suppliers: [
            {
                id: 1,
                name: 'Reese',
                scores: {
                    1: 5,
                    2: 10,
                    3: 15
                }
            },
            {
                id: 2,
                name: 'Kitkat',
                scores: {
                    1: 20,
                    2: 25,
                    3: 30
                }
            }
        ]
    };
    const { component } = setup(props);

    it('should be able to render the criteria headers', () => {
        const headers = component.find('th');
        expect(headers).to.have.length(props.criteria.length + 1);

        let counter = 0;
        headers.forEach(header => {
            if (!counter) {
                expect(header.text()).to.eql('User');
                return counter++;
            }

            expect(header.text()).to.eql(props.criteria[counter - 1].title);
            counter++;
        });
    });

    it('should be able to render the rows', () => {
        const rows = component.find(ComparisonRow);
        expect(rows).to.have.length(props.suppliers.length);
    });
});
