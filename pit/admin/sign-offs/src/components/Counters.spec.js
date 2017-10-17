import React from 'react';
import { shallow } from 'enzyme';
import Counters from './Counters';
import { expect } from 'chai';

describe('Counters component: ', () => {
    it('should render the status counters', () => {
        const counters = {
            approved: 3,
            rejected: 0,
            inprogress: 2,
            pending: 3
        };

        const component = shallow(
            <Counters counters={counters}/>
        );

        expect(+component.find('.badge-info').text()).to.eql(3);
        expect(+component.find('.badge-success').text()).to.eql(3);
        expect(+component.find('.badge-bg-danger').text()).to.eql(0);
        expect(+component.find('.badge-warning').text()).to.eql(2);
    });
});

