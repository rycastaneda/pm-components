import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import Section from './Section';

const setup = (props) => {
    const component = shallow(
        <Provider store={mockStore({ sections: { byId: {}, allIds: [] } })}>
            <Section {...props} />
        </Provider>
    );

    return { component };
};

const toggleSection = sinon.spy();
const toggleStatus = sinon.spy();
const dispatch = sinon.spy();

describe('Section container: ', () => {
    const { component } = setup({ 
        name: 'Company Size', 
        status: 'approved', 
        currentTab: 'questions',
        isCollapsed: false,
        isReadOnly: false,
        questions: [{
            id: 1,
            question: `What is your favorite food?`
        }, {
            id: 2,
            question: `What is your pet's name?`
        }],
        comments: [{
            id: 1,
            comment: `Company size is too small, still considering`,
            date: `09-17-2017 9:20:00 AM`
        }, {
            id: 2,
            comment: `I don't like his pet's name, sounds elf-ish`,
            date: `09-17-2017 9:20:00 AM`
        }],
        dispatch,
        toggleSection,
        toggleStatus
    });

    it('should render section and get its properties correctly', () => {
        const props = component.props();
        expect(props.name).to.eql('Company Size');
        expect(props.status).to.eql('approved');
    });

});