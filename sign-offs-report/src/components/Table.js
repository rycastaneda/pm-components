import React, { PropTypes } from 'react';
import Header from './Header';
import RowHeader from './RowHeader';
import Row from './Row';
import Loader from './Loader';

const Table = ({
    data,
    orderByField,
    orderByDirection,
    changeOrderBy,
    toggleCommentsModal,
    toggleSupplierRow,
    isLoading
}) => {
    const direction = field => {
        return field === orderByField ? orderByDirection : null;
    };

    const headers = [
        {
            text: 'Supplier',
            field: 'supplier',
            sortable: true
        },
        {
            text: 'Panel',
            field: 'panel',
            sortable: false
        },
        {
            text: 'Section',
            field: 'section',
            sortable: false
        },
        {
            text: 'Assigned To',
            field: 'assignee',
            sortable: false
        },
        {
            text: 'Status',
            field: 'status',
            sortable: false
        },
        {
            text: 'Last Updated',
            field: 'lastUpdated',
            sortable: false
        },
        {
            text: 'Comments',
            field: 'comments',
            sortable: false
        }
    ];

    const tableData = () => {
        if (!data || !data.length) {
            return (
                <tr>
                    <td colSpan="7" className="td-center">
                        {isLoading ? (
                            <Loader icon=" fa-2x" />
                        ) : (
                            'No data available'
                        )}
                    </td>
                </tr>
            );
        }

        return data.map(supplier => {
            let rows = [
                <RowHeader
                    toggleSupplierRow={toggleSupplierRow}
                    id={supplier.id}
                    key={supplier.supplierId}
                    isOpen={supplier.isOpen}
                    supplier={supplier.supplierTitle}
                    count={supplier.assignments.length}
                />
            ];

            if (supplier.isOpen) {
                supplier.assignments.map(row => {
                    rows.push(
                        <Row
                            key={row.id}
                            {...row}
                            toggleCommentsModal={toggleCommentsModal}
                        />
                    );
                });
            }

            return rows;
        });
    };

    return (
        <table className="table db-table db-table-sort db-table-link db-table-sort-nojs">
            <thead>
                <tr>
                    {headers.map(header => (
                        <Header
                            key={header.field}
                            onClick={changeOrderBy}
                            direction={direction(header.field)}
                            {...header}
                        />
                    ))}
                </tr>
            </thead>
            <tbody>{tableData()}</tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    orderByField: PropTypes.string.isRequired,
    orderByDirection: PropTypes.string.isRequired,
    changeOrderBy: PropTypes.func.isRequired,
    toggleCommentsModal: PropTypes.func.isRequired,
    toggleSupplierRow: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Table;
