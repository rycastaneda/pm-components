import React, { PropTypes } from 'react';

const Question = ({ question, answer }) => (
    <div className="pad-btm font-rg">
        <p className="pad-btm-sm">{question}</p>
        <strong>{answer}</strong>
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
};

export default Question;