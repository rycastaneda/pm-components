import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import Spinner from '../../components/Spinner/main';
const SupplierInteractionsTable = ({ interactions, isLoading }) => (
    <div>
        <table className="table db-table db-table-sort db-table-sort-nojs">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Interaction</th>
                    <th>Initiated by</th>
                    <th>Related to</th>
                    <th>Status</th>
                    <th>More</th>
                </tr>
            </thead>

            <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={6}>
                            <Spinner />
                        </td>
                    </tr>
                ) : (
                    interactions.map((item, index) => (
                        <TableRow rowItem={item} key={index} />
                    ))
                )}
            </tbody>
        </table>
    </div>
);

SupplierInteractionsTable.propTypes = {
    interactions: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default SupplierInteractionsTable;
