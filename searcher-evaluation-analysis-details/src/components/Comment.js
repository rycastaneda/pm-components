import React, { PropTypes } from 'react';
import Score from './Score';

const Comment = ({ staff, comment, score, scale }) => (
    <tr>
        <td className="staff">
            <strong>{staff}</strong>
        </td>
        <td className="comment">{comment}</td>
        <td className="scorebox text-right">
            <Score score={score} scale={scale} showDecimals={false} />
        </td>
    </tr>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};

export default Comment;
