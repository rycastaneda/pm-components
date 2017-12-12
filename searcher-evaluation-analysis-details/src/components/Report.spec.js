import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Line } from 'react-chartjs-2';
import Report from './Report';

describe('Report component: ', () => {
    let component;
    const props = {
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
        ]
    };

    it('should render the Line Chart', () => {
        component = shallow(<Report {...props} />);

        expect(component.find(Line));
    });
});

