import React from 'react';
import { shallow } from 'enzyme';
import SignOff from './SignOff';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = (props) => {
    const component = shallow(
        <Provider store={mockStore()}>
            <SignOff {...props} />
        </Provider>
    );

    return { component };
};

const dispatch = sinon.spy();

describe('SignOff container: ', () => {
    it('should render the container with props and onChange function', () => {
        const { component } = setup({ 
            sections: [{
                id: 1,
                name: 'Company Size'
            }, {
                id: 2,
                name: 'Company Location'
            }, {
                id: 3,
                name: 'Health & Safety'
            }], 
            dispatch,
            isLoading: true
        });

        const props = component.props();

        expect(props.sections).to.have.length(3);
        expect(props.sections[0]).to.have.property('name', 'Company Size');
    });
});
