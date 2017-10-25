import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import mockSections from '../mocks/sections.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import ManageSectionModal from './ManageSectionModal';

const assignedStaffs = mockSections.included
    .filter(include => include.type === 'staff')
    .map((include) => {
        return {
            ...include.attributes
        };
    });

const setup = (props) => {
    const component = shallow(
        <Provider store={mockStore({ sections: { byId: {}, allIds: [] } })}>
            <ManageSectionModal {...props} />
        </Provider>
    );

    return { component };
};

const dispatch = sinon.spy();

describe('ManageSectionModal container: ', () => {
    const { component } = setup({ 
        sectionId: 1,
        assignedStaffs,
        dispatch
    });

    it('should render sectionModal and get its properties correctly', () => {
        const props = component.props();
        expect(props.sectionId).to.eql(1);
        expect(props.assignedStaffs).to.eql(assignedStaffs);
    });

});