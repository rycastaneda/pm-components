import React, { PropTypes } from 'react';

const Comment = ({ staff, comment, score }) => (
    <div>
        <div className="row">
            <div className="col-lg-3">Staff</div>
            <div className="col-lg-6">Comment</div>
            <div className="col-lg-3">Score</div>
        </div>
        <div className="row commentbox">
            <div className="col-lg-3 staff">{staff}</div>
            <div className="col-lg-6 comment">{comment}</div>
            <div className="col-lg-6 score">{score}</div>
        </div>
    </div>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
};

export default Comment;
