import React from 'react';
import { shallow } from 'enzyme';
import UserBadge from './UserBadge';
import { expect } from 'chai';

describe('UserBadge component: ', () => {
    it('should render name', () => {
        const component = shallow(<UserBadge name="Tester" />);

        expect(component.text()).to.eql('Tester');
    });
});
