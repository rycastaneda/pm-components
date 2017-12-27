import React, { PropTypes } from 'react';

const ComparisonRow = ({ criteria, entity }) => {
    let totalScores = 0;
    return (
        <tr>
            <td className="name text-center">{entity.name}</td>
            {criteria.map(criterion => {
                totalScores += entity.scores[criterion.id];
                return (
                    <td key={criterion.id} className="score td-center">
                        {entity.scores[criterion.id]}
                    </td>
                );
            })}
            <td className="td-center total">{totalScores}</td>
        </tr>
    );
};

ComparisonRow.propTypes = {
    criteria: PropTypes.array,
    entity: PropTypes.object
};

export default ComparisonRow;
