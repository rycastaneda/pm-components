import React, { PropTypes } from 'react';

const ComparisonRow = ({ criteria, entity }) => {
    let totalScores = 0;
    return (
        <tr>
            <td className="name text-left">{entity.title}</td>
            {criteria.map(criterion => {
                totalScores += entity.score[criterion.id];
                entity.score[criterion.id] = parseFloat(
                    entity.score[criterion.id]
                ).toFixed(1);

                return (
                    <td key={criterion.id} className="score text-left">
                        {entity.score[criterion.id]}
                    </td>
                );
            })}
            <td className=" text-left total">
                {parseFloat(totalScores).toFixed(1)}
            </td>
        </tr>
    );
};

ComparisonRow.propTypes = {
    criteria: PropTypes.array,
    entity: PropTypes.object
};

export default ComparisonRow;
