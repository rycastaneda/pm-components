import React from 'react';
import { mount } from 'enzyme';
import Select from 'react-select';
import mockStaff from '../mocks/staff.json';
import { staff } from '../reducers/staff';
import UserList from '../components/UserList';
import UserSelector from './UserSelector';

import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const dispatch = sinon.spy();
const componentProps = {
    sectionId: '1',
    isLoading: false,
    assignedUsers: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }],
    unassignedUsers: [
        { name: 'test3', id: 3 },
        { name: 'test4', id: 4 },
        { name: 'test5', id: 5 }
    ],
    dispatch
};

const staffState = staff(undefined, {
    type: 'RECEIVE_STAFF',
    staffs: mockStaff
});
const setup = props => {
    const component = mount(
        <Provider store={mockStore({ staff: staffState })}>
            <UserSelector {...props} />
        </Provider>
    );

    return { component };
};

describe('UserSelector container: ', () => {
    it('should render the list of users by default with props', () => {
        const { component } = setup(componentProps);

        const list = component.find(UserList);
        expect(list).to.have.length(1);
        const props = list.props();
        expect(props.users).to.eql(componentProps.assignedUsers);
    });

    it('should render the staff selector if it has no assignedUsers', () => {
        const { component } = setup({
            ...componentProps,
            assignedUsers: []
        });

        const list = component.find(Select);
        expect(list).to.have.length(1);
    });
});
