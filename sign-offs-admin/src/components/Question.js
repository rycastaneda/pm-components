import React, { PropTypes } from 'react';
import Answer from './Answer';

const Question = ({ question, type, answer, uploads }) => (
    <div className="pad-btm font-rg">
        <p className="pad-btm-sm">{question}</p>
        {uploads.length ? (
            uploads.map(upload => (
                <a key={upload.id} href={upload.download_url}>
                    {upload.original_name}
                </a>
            ))
        ) : (
            <Answer type={type} answer={answer} />
        )}
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    type: PropTypes.string,
    answer: PropTypes.string,
    uploads: PropTypes.array
};

export default Question;
