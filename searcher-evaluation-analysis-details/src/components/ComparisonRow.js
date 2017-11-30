import React, { PropTypes } from 'react';

const ComparisonRow = ({ criteria, supplier }) => (
    <tr>
        <td className="text-center">{supplier.name}</td>
        {criteria.map(criterion => (
            <td key={criterion.id} className="text-right">
                {supplier.scores[criterion.id]}
            </td>
        ))}
    </tr>
);

ComparisonRow.propTypes = {
    criteria: PropTypes.array,
    supplier: PropTypes.object
};

export default ComparisonRow;
