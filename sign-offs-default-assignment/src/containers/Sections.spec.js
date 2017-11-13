import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import mockStaff from '../mocks/staff.json';
import mockSections from '../mocks/sections.json';
import { staff } from '../reducers/staff';
import { sections } from '../reducers/sections';
import Section from '../components/Section';
import Sections from './Sections';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const dispatch = sinon.spy();
const sectionSate = sections(undefined, {
    type: 'RECEIVE_SECTIONS',
    sections: mockSections
});
const staffState = staff(undefined, {
    type: 'RECEIVE_STAFF',
    staffs: mockStaff
});

const componentProps = {
    dispatch,
    sections: sectionSate.allIds.map(sectionId => sectionSate.byId[sectionId]),
    error: ''
};

const setup = props => {
    const component = mount(
        <Provider
            store={mockStore({
                staff: staffState,
                sections: sectionSate,
                ui: { error: '' }
            })}>
            <Sections {...props} />
        </Provider>
    );

    return { component };
};

describe('Sections container: ', () => {
    it('should render the list of sections', () => {
        const { component } = setup(componentProps);

        const sections = component.find(Section);
        expect(sections.length).to.eql(componentProps.sections.length);
    });
});
