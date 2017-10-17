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
    it('should render the lists of users with badges', () => {

        const component = shallow(
            <UserList users={users} toggleManageSectionModal={toggleManageSectionModal}/>
        );

        expect(component.find(UserBadge)).to.have.length(users.length);
    });

    it('should render a message if no users are found', () => {

        const component = shallow(
            <UserList users={[]} toggleManageSectionModal={toggleManageSectionModal}/>
        );

        expect(component.find(UserBadge)).to.have.length(0);
        expect(component.find('.user-lists').text()).to.eql('No staff assigned to this section yet.');
    });
});

