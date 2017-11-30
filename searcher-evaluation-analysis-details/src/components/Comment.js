import React, { PropTypes } from 'react';

const Comment = ({ staff, comment, score }) => (
    <div className="mar-btm">
        <div className="row">
            <div className="col-sm-2 col-sm-offset-1">Staff</div>
            <div className="col-sm-6">Comment</div>
            <div className="col-sm-3">Score</div>
        </div>
        <div className="row commentbox">
            <div className="col-sm-2 col-sm-offset-1 staff">{staff}</div>
            <div className="col-sm-6 comment">{comment}</div>
            <div className="col-sm-6 score">{score}</div>
        </div>
    </div>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
};

export default Comment;
