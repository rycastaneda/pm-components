import React, { PropTypes } from 'react';
import Header from './Header';
import SupplierRow from './SupplierRow';
import Panel from './Panel';
import Loader from './Loader';
import { TABLE_HEADERS } from '../constants/tables';
import { prefStatus } from '../constants/supplierStatus';

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
        if (isLoading || (!data || !data.length)) {
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
                    supplier={supplier.title}
                    count={supplier.count}
                    panels={supplier.panels}
                    dateApplied={supplier.dateApplied}
                    statusClass={prefStatus[supplier.status].class}
                    status={prefStatus[supplier.status].label}
                    isOpen={supplier.isOpen}
                />
            ];

            if (supplier.isOpen) {
                rows.push(
                    <Panel
                        assignments={supplier.assignments}
                        toggleCommentsModal={toggleCommentsModal}
                    />
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
