import React, { PropTypes } from 'react';
import Answer from './Answer';

const Question = ({ question, type, answer }) => (
    <div className="pad-btm font-rg">
        <p className="pad-btm-sm">{question}</p>
        <Answer type={type} answer={answer} />
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    type: PropTypes.string,
    answer: PropTypes.string
};

export default Question;
