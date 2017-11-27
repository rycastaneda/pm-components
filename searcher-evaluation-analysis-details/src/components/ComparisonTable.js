import React, { PropTypes } from 'react';
import ComparisonRow from './ComparisonRow';
const ComparisonTable = ({ criteria, suppliers }) => (
    <table>
        <thead>
            <tr>
                <th>User</th>
                {criteria.map(criterion => (
                    <th key={criterion.id}>{criterion.title}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {suppliers.map(supplier => {
                return (
                    <ComparisonRow
                        key={supplier.id}
                        criteria={criteria}
                        supplier={{ ...supplier }}
                    />
                );
            })}
        </tbody>
    </table>
);

ComparisonTable.propTypes = {
    criteria: PropTypes.array,
    suppliers: PropTypes.array
};

export default ComparisonTable;
