import React, { PropTypes } from 'react';

const Comment = ({ staff, comment, score }) => (
    <tr>
        <td className="staff"><strong>{staff}</strong></td>
        <td className="comment">{comment}</td>
        <td className="scorebox text-right">
            <span className="label label-lg label-plantminer">{score}</span>
        </td>
    </tr>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
};

export default Comment;
