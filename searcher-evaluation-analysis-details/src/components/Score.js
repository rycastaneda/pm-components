import React, { PropTypes } from 'react';

const Score = ({ score, scale }) => {
    let scoreLabel;

    if (scale === 1) {
        scoreLabel = score ? 'YES' : 'NO';
    } else {
        scoreLabel = score === 0 ? 0 : score.toFixed(1);
    }

    return (
        <span className="label total label-lg label-plantminer">
            {scoreLabel}
        </span>
    );
};

Score.propTypes = {
    score: PropTypes.number,
    scale: PropTypes.number
};

export default Score;
