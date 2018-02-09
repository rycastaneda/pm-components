import React, { PropTypes } from 'react';

const Answer = ({ type, answer }) => {
    let finalAnswer = !+answer ? '-' : answer;
    switch (type) {
        case 'yes_no':
            finalAnswer = answer === '1' ? 'Yes' : 'No';
            break;
        case 'upload':
            finalAnswer = !+answer ? (
                'No file uploaded'
            ) : (
                <a href={answer}>File</a>
            );
            break;
    }

    return <strong>{finalAnswer}</strong>;
};

Answer.propTypes = {
    type: PropTypes.string.isRequired,
    answer: PropTypes.string
};

export default Answer;
