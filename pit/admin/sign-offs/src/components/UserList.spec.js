import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';
import UserBadge from './UserBadge';
import { expect } from 'chai';
import sinon from 'sinon';

const users = [{
    id: 1,
    name: 'Tester',
    status: 'pending'
}, {
    id: 2,
    name: 'Tester approved',
    status: 'approved'
}, {
    id: 3,
    name: 'Tester',
    status: 'in progress'
}];

const toggleManageSectionModal = sinon.spy(); 

describe('UserList component: ', () => {
    it('should render a spinner', () => {

        const component = shallow(
            <UserList users={users} toggleManageSectionModal={toggleManageSectionModal}/>
        );

        expect(component.find(UserBadge)).to.have.length(users.length);
    });
});

