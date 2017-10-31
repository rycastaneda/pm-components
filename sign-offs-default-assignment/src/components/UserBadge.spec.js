import React from 'react';
import { shallow } from 'enzyme';
import UserBadge from './UserBadge';
import { expect } from 'chai';
import sinon from 'sinon';

const removeUser = sinon.spy();

describe('UserBadge component: ', () => {
    it('should render name', () => {
        const component = shallow(
            <UserBadge id="1" name="Tester" removeUser={removeUser} />
        );

        expect(component.find('.name').text()).to.eql('Tester');
    });
});
