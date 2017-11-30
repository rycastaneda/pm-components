import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Assignments } from './Assignments';
import Filters from './Filters';
import Table from '../components/Table';
import PaginatePerPage from '../components/PaginatePerPage';
import CommentModal from './CommentModal';

const setup = props => {
    const component = shallow(
        <Assignments {...props} />
    );

    return { component };
};

const componentProps = {
    dispatch: sinon.spy(),
    parameters: {
        error: '',
        orderByField: 'status',
        orderByDirection: 'asc',
        keyword: '',
        filters: {
            assignee: '',
            status: [0, 1]
        },
        page: 1,
        perPage: 15,
        totalPage: 10
    },
    isLoading: false,
    assignments: [],
    staff: {},
    currentAssignment: {}
};

describe('Assignment container: ', () => {
    const { component } = setup(componentProps);

    it('should render Filters with props', () => {
        const filters = component.find(Filters);
        expect(filters).to.have.length(1);
        const props = filters.props();
        expect(props).to.have.property('keyword', componentProps.parameters.keyword);
        expect(props).to.have.property('selectedStaff', +componentProps.parameters.filters.assignee);
        expect(props).to.have.property('status', componentProps.parameters.filters.status);
    });

    it('should render Table with props', () => {
        const table = component.find(Table);
        expect(table).to.have.length(1);
        const props = table.props();
        expect(props).to.have.property('orderByField', componentProps.parameters.orderByField);
        expect(props).to.have.property('orderByDirection', componentProps.parameters.orderByDirection);
    });

    it('should render PaginatePerPage with props', () => {
        const paginate = component.find(PaginatePerPage);
        expect(paginate).to.have.length(1);
        const props = paginate.props();
        expect(props).to.have.property('pageCount', componentProps.parameters.totalPage);
        expect(props).to.have.property('perPage', componentProps.parameters.perPage);
    });

    it('should render CommentModal with props', () => {
        const commentModal = component.find(CommentModal);
        expect(commentModal).to.have.length(1);
        const props = commentModal.props();
        expect(props).to.have.property('assignment', componentProps.currentAssignment);
    });

});
