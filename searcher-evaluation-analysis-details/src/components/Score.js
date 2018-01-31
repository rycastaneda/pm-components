import React, { PropTypes } from 'react';

const Score = ({ score, scale, showDecimals, hasComments }) => {
    let scoreLabel;
    switch (scale) {
        case 1:
            scoreLabel = score ? 'Yes' : 'No';
            break;
        case 5:
        case 10:
            if (!hasComments) {
                // score has not been rated
                scoreLabel = '-';
                break;
            }

            if (!score) {
                // show flat 0
                scoreLabel = 0;
                break;
            }
            scoreLabel = showDecimals ? score.toFixed(1) : score;
            break;
        case 0: // free type question show N/A
            scoreLabel = 'N/A';
            break;
    }

    return (
        <span className={`label total label-lg label-plantminer`}>
            {scoreLabel}
        </span>
    );
};

Score.propTypes = {
    score: PropTypes.number,
    scale: PropTypes.number,
    showDecimals: PropTypes.bool,
    hasComments: PropTypes.bool
};

export default Score;
