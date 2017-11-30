import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import SearchForm from './SearchForm';

const setup = props => {
    const component = mount(<SearchForm {...props} />);

    return { component };
};

const searchRef = sinon.spy();
const quickSearch = sinon.spy();
const toggleFilters = sinon.spy();
const downloadAssignments = sinon.spy();

describe('SearchForm component: ', () => {
    const props = {
        keyword: 'test',
        showFilters: true,
        searchRef,
        quickSearch,
        toggleFilters,
        downloadAssignments
    };
    const { component } = setup(props);

    it('should be able to render the search field', () => {
        expect(component.find('input[type="search"]').props().defaultValue).to.eql(props.keyword);
    });

    it('should be able to toggleFilters', function() {
        component.find('.fa-sort-amount-desc').simulate('click');
        expect(toggleFilters.called).to.be.true;
    });

    it('should be able to downloadAssignments', function() {
        component.find('.fa-download').simulate('click');
        expect(downloadAssignments.called).to.be.true;
    });
});


