import React, { PropTypes } from 'react';

const Score = ({ score, scale, showDecimals }) => {
    let scoreLabel;

    if (scale === 1) {
        scoreLabel = score ? 'Yes' : 'No';
    } else {
        if (!score) {
            scoreLabel = 0;
        } else {
            scoreLabel = showDecimals ? score.toFixed(1) : score;
        }
    }

    return (
        <span className="label total label-lg label-plantminer">
            {scoreLabel}
        </span>
    );
};

Score.propTypes = {
    score: PropTypes.number,
    scale: PropTypes.number,
    showDecimals: PropTypes.bool
};

export default Score;
