import React from 'react';
import { mount } from 'enzyme';
import Counters from './Counters';
import CounterBadge from './CounterBadge';
import { expect } from 'chai';

describe('Counters component: ', () => {
    it('should render the status counters', () => {
        const counters = {
            approved: 3,
            rejected: 0,
            inprogress: 2,
            pending: 3
        };

        const component = mount(
            <Counters counters={counters}/>
        );

        expect(component.find(CounterBadge)).to.have.length(4);
    });
});

