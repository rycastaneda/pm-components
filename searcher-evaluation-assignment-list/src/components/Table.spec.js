import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Table from './Table';
import Header from './Header';
import Row from './Row';
import Loader from './Loader';

const setup = (props) => {
    const component = shallow(
        <Table {...props} />
    );

    return { component };
};

const changeOrderBy = sinon.spy();
const toggleCommentsModal = sinon.spy();

describe('Table component: ', () => {
    const props = { 
        data: [{
            id: 1,
            supplier: 'Test Supplier',
            panels: 'Test Panels',
            section: 'Section',
            assignee: 'Test Assignee',
            status: 'Pending',
            lastUpdated: '' + new Date(),
            comments: []
        }],
        orderByField: 'status',
        orderByDirection: 'asc',
        changeOrderBy,
        toggleCommentsModal,
        isLoading: false
    };
    const { component } = setup(props);


    it('should render the headers', () => {
        expect(component.find(Header)).to.have.length(7);
    });

    it('should render the rows', () => {
        expect(component.find(Row)).to.have.length(1);
    });

    it('should render the loader', () => {
        const { component } = setup({ ...props, data: null, isLoading: true });

        expect(component.find(Loader)).to.have.length(1);
    });


});