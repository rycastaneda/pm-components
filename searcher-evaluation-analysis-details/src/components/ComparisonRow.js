import React, { PropTypes } from 'react';

const ComparisonRow = ({ criteria, entity }) => {
    let totalScores = 0;
    return (
        <tr>
            <td className="text-center">{entity.name}</td>
            {criteria.map(criterion => {
                totalScores += entity.scores[criterion.id];
                return (
                    <td key={criterion.id} className="text-right">
                        {entity.scores[criterion.id]}
                    </td>
                );
            })}
            <td className="text-right">{totalScores}</td>
        </tr>
    );
};

ComparisonRow.propTypes = {
    criteria: PropTypes.array,
    entity: PropTypes.object
};

export default ComparisonRow;
