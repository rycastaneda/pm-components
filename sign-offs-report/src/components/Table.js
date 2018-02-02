import React, { PropTypes } from 'react';
import Header from './Header';
import SupplierRow from './SupplierRow';
import AssignmentRow from './AssignmentRow';
import Loader from './Loader';
import { TABLE_HEADERS, ROW_HEADERS } from '../constants/tables';

const Table = ({
    data,
    orderByField,
    orderByDirection,
    changeOrderBy,
    toggleCommentsModal,
    toggleSupplierRow,
    isLoading
}) => {
    const goToSupplierDetails = preferredSupplierId => {
        return (window.location.href =
            '/searcher/preferred_suppliers/details/' + preferredSupplierId);
    };

    const direction = field => {
        return field === orderByField ? orderByDirection : null;
    };

    const tableData = () => {
        if (!data || !data.length) {
            return (
                <tr>
                    <td
                        colSpan={TABLE_HEADERS.length + 1}
                        className="td-center">
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
                <SupplierRow
                    goToSupplierDetails={() => goToSupplierDetails(supplier.id)}
                    toggleSupplierRow={toggleSupplierRow}
                    id={supplier.id}
                    key={supplier.supplierId}
                    isOpen={supplier.isOpen}
                    supplier={supplier.supplierTitle}
                    count={supplier.assignments.length}
                />
            ];

            let assignments = [];
            if (supplier.isOpen) {
                assignments = supplier.assignments.map(row => (
                    <AssignmentRow
                        key={row.id}
                        {...row}
                        toggleCommentsModal={toggleCommentsModal}
                    />
                ));

                rows.push(
                    <tr>
                        <td colSpan="5" className="td-center">
                            <table className="table db-table db-table-sort db-table-sort-nojs">
                                <thead>
                                    <tr>
                                        {ROW_HEADERS.map(header => (
                                            <Header
                                                key={header.field}
                                                onClick={changeOrderBy}
                                                direction={direction(
                                                    header.field
                                                )}
                                                {...header}
                                            />
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>{assignments}</tbody>
                            </table>
                        </td>
                    </tr>
                );
            }

            return rows;
        });
    };

    return (
        <table className="table db-table db-table-sort db-table-sort-nojs">
            <thead>
                <tr>
                    <th />
                    {TABLE_HEADERS.map(header => (
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
