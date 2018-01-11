import React, { PropTypes } from 'react';

const ComparisonRow = ({ criteria, entity }) => {
    let totalScores = 0;
    return (
        <tr>
            <td className="name ">{entity.name}</td>
            {criteria.map(criterion => {

                totalScores += entity.scores[criterion.id];
                entity.scores[criterion.id] = parseFloat(entity.scores[criterion.id]).toFixed(1);

                return (
                    <td key={criterion.id} className="score td-center">
                        {entity.scores[criterion.id]}
                    </td>
                );
            })}
            <td className="td-center total">{parseFloat(totalScores).toFixed(1)}</td>
        </tr>
    );
};

ComparisonRow.propTypes = {
    criteria: PropTypes.array,
    entity: PropTypes.object
};

export default ComparisonRow;
