import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';
import { expect } from 'chai';

describe('Loader component: ', () => {
    it('should render a spinner', () => {
        const component = shallow(
            <Loader />
        );

        expect(component.find('.loader__spinner')).to.have.length(1);
    });

    it('should render a spinner in a block display', () => {
        const component = shallow(
            <Loader block/>
        );
        expect(component.hasClass('loader-block'));
    });

    it('should render a spinner with a smaller icon', () => {
        const component = shallow(
            <Loader icon="-small"/>
        );

        expect(component.find('.loader__spinner-small')).to.have.length(1);
    });
});

