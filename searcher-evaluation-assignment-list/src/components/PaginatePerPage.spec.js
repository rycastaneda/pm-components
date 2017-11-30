import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import PaginatePerPage from './PaginatePerPage';
import ReactPaginate from 'react-paginate';

const setup = props => {
    const component = mount(<PaginatePerPage {...props} />);

    return { component };
};

const onPageChange = sinon.spy();
const onPerPageChange = sinon.spy();

describe('PaginatePerPage component: ', () => {
    it('should be able to render the PaginatePerPage with props', () => {
        const props = {
            pageCount: 5,
            perPage: 15,
            onPageChange,
            onPerPageChange
        };
        const { component } = setup(props);
        const paginate = component.find(ReactPaginate);
        expect(paginate).to.have.length(1);
        expect(paginate.props().pageCount).to.eql(props.pageCount);
        expect(component.find('select').props().value).to.eql(props.perPage);
        expect(component.find('option')).to.have.length(4);
    });
});
