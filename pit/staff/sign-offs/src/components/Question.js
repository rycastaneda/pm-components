import React, { PropTypes } from 'react';

const Question = ({ question, answer }) => (
    <div className="request-detail">
        <p>{question}</p>
        <strong>{answer}</strong>
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
};

export default Question;