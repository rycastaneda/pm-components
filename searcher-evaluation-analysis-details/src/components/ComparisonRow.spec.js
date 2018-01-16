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
        entity: {
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

    it('should be able to render the first cell with entity name', () => {
        expect(component.find('td.name').text()).to.eql(props.entity.name);
    });

    it('should be able to render the scores as cells', () => {
        const cells = component.find('td.score');
        expect(cells).to.have.length(props.criteria.length);

        let counter = 0;
        cells.forEach(cell => {
            const criteriaId = props.criteria[counter].id;
            const score = props.entity.scores[criteriaId];
            expect(+cell.text()).to.eql(score);
            counter++;
        });
    });

    it('should be able to render total scores', () => {
        const totalScores = Object.values(props.entity.scores).reduce((a, b) => a + b);

        expect(+component.find('td.total').text()).to.eql(totalScores);
    });
});
