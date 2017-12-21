import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Table from './Table';
import Header from './Header';
import RowHeader from './RowHeader';
import Row from './Row';
import Loader from './Loader';

const setup = props => {
    const component = shallow(<Table {...props} />);

    return { component };
};

const changeOrderBy = sinon.spy();
const toggleCommentsModal = sinon.spy();
const toggleSupplierRow = sinon.spy();

describe('Table component: ', () => {
    const props = {
        data: [
            {
                id: 88,
                supplierTitle: 'A1 TREE SERVICE',
                isOpen: false,
                assignmentIds: ['1', '2', '3', '4', '5'],
                assignments: [
                    {
                        id: '1',
                        section_id: 1,
                        preferred_supplier_id: 88,
                        supplier: 'A1 TREE SERVICE',
                        panels: 'PS/0077 Wet Hire',
                        section: 'Extra Details',
                        assignee: 'Adam Wyatt',
                        last_updated: null,
                        comments: 0,
                        status_label: 'Pending',
                        lastUpdated: null,
                        status: 'Pending',
                        sectionId: 1,
                        preferredSupplierId: 88,
                        commentIds: [],
                        isShown: false
                    },
                    {
                        id: '2',
                        section_id: 1,
                        preferred_supplier_id: 88,
                        supplier: 'A1 TREE SERVICE',
                        panels: 'PS/0077 Wet Hire',
                        section: 'Extra Details',
                        assignee: 'Adrian Curro',
                        last_updated: null,
                        comments: 0,
                        status_label: 'Pending',
                        lastUpdated: null,
                        status: 'Pending',
                        sectionId: 1,
                        preferredSupplierId: 88,
                        commentIds: [],
                        isShown: false
                    },
                    {
                        id: '3',
                        section_id: 1,
                        preferred_supplier_id: 88,
                        supplier: 'A1 TREE SERVICE',
                        panels: 'PS/0077 Wet Hire',
                        section: 'Extra Details',
                        assignee: 'Adeel Ur-Rehman',
                        last_updated: null,
                        comments: 0,
                        status_label: 'Pending',
                        lastUpdated: null,
                        status: 'Pending',
                        sectionId: 1,
                        preferredSupplierId: 88,
                        commentIds: [],
                        isShown: false
                    },
                    {
                        id: '4',
                        section_id: 2,
                        preferred_supplier_id: 88,
                        supplier: 'A1 TREE SERVICE',
                        panels: 'PS/0077 Wet Hire',
                        section: 'WH&S Policy and Management',
                        assignee: 'Adeel Ur-Rehman',
                        last_updated: null,
                        comments: 0,
                        status_label: 'Pending',
                        lastUpdated: null,
                        status: 'Pending',
                        sectionId: 2,
                        preferredSupplierId: 88,
                        commentIds: [],
                        isShown: false
                    },
                    {
                        id: '5',
                        section_id: 2,
                        preferred_supplier_id: 88,
                        supplier: 'A1 TREE SERVICE',
                        panels: 'PS/0077 Wet Hire',
                        section: 'WH&S Policy and Management',
                        assignee: 'Adam Wyatt',
                        last_updated: null,
                        comments: 0,
                        status_label: 'Pending',
                        lastUpdated: null,
                        status: 'Pending',
                        sectionId: 2,
                        preferredSupplierId: 88,
                        commentIds: [],
                        isShown: false
                    }
                ]
            }
        ],
        orderByField: 'status',
        orderByDirection: 'asc',
        changeOrderBy,
        toggleCommentsModal,
        toggleSupplierRow,
        isLoading: false
    };

    let { component } = setup(props);

    it('should render the headers', () => {
        expect(component.find(Header)).to.have.length(7);
    });

    it('should render the rowHeaders with no rows first', () => {
        expect(component.find(RowHeader)).to.have.length(props.data.length);
        expect(component.find(Row)).to.have.length(0);
    });

    it('should render the rows', () => {
        let data = props.data;
        data[0].isOpen = true;
        let { component } = setup({
            ...props,
            data
        });

        expect(component.find(Row)).to.have.length(
            props.data[0].assignments.length
        );
    });

    it('should render the loader', () => {
        const { component } = setup({ ...props, data: null, isLoading: true });

        expect(component.find(Loader)).to.have.length(1);
    });
});
