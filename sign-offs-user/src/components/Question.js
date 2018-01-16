import React, { PropTypes } from 'react';

const Question = ({ question, answer }) => (
    <div className="request-detail pad-btm font-rg">
        <p className="title pad-btm-sm">{question}</p>
        <span>{answer}</span>
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
};

export default Question;
