import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';
import { expect } from 'chai';



describe('Loader component: ', () => {
    it('should render a spinner', () => {
        const component = shallow(
            <Loader />
        );

        expect(component.find('.loader__spinner')).to.be.ok;
    });

});

