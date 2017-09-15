import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ConfigureTags from './ConfigureTags';
import TagsList from './TagsList';
describe('ConfigureTag continernt: ', () => {
    it('should render initially', () => {
        const store = {
            getState: function() {},
            subscribe: function() {},
            dispatch: sinon.spy()
        };
        const component = shallow(<ConfigureTags store={store} />);
        expect(component.find(TagsList).length).to.be.at.least(1);
    });
});
