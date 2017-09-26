import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { createStore } from 'redux';
import TagsList from './TagsList';
import reducer from '../reducers/index';
describe('TagsList container: ', () => {
    it('should render TagsList with no tags', () => {
        const store = createStore(reducer);
        const component = shallow(<Provider store={store}><TagsList/></Provider>);
        const taglist = component.find(TagsList);
        expect(taglist.find('table')).to.not.be.null;
        expect(taglist.find('table tr')).to.be.of.length(0);
    });
});
