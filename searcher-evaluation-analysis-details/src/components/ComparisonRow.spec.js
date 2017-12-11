import React from 'react';

import { mount } from 'enzyme';
import { expect } from 'chai';
import ComparisonRow from './ComparisonRow';

const setup = props => {
    const component = mount(<ComparisonRow {...props} />);

    return { component };
};

describe('ComparisonRow component: ', () => {
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
        supplier: {
            id: 1,
            name: 'Reese',
            scores: {
                1: 5,
                2: 10,
                3: 15
            }
        }
    };
    const { component } = setup(props);

    it('should be able to render the rows', () => {
        const cells = component.find('td');
        expect(cells).to.have.length(props.criteria.length + 2);

        let counter = 0;
        cells.forEach(cell => {
            if (!counter) {
                expect(cell.text()).to.eql(props.supplier.name);
                return counter++;
            }

            const counterId = props.criteria[counter - 1].id;
            const score = props.supplier.scores[counterId];
            expect(+cell.text()).to.eql(score);
            counter++;
        });
    });
});
