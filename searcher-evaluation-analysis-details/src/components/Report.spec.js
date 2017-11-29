import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Line } from 'react-chartjs-2';
import Report from './Report';

describe('Report component: ', () => {
    let component;
    const props = {
        reportData: [
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

    it('should render the Line Chart', () => {
        component = shallow(<Report {...props} />);

        expect(component.find(Line));
    });
});

