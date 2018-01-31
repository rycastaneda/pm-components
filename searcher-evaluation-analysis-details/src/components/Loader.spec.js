import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';
import { expect } from 'chai';

describe('Loader component: ', () => {
    it('should render a spinner', () => {
        const component = shallow(<Loader />);

        expect(component.find('.loading-animation')).to.have.length(1);
    });

    it('should render a spinner in a block display', () => {
        const component = shallow(<Loader block />);
        expect(component.hasClass('loader-block'));
    });
});
