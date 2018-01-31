import React, { PropTypes } from 'react';
import Score from './Score';
import UploadLists from './UploadLists';

const Comment = ({ staff, comment, score, scale, uploads }) => (
    <tbody>
        <tr>
            <td className="staff">
                <strong>{staff}</strong>
            </td>
            <td className="comment">{comment}</td>
            <td className="scorebox text-right">
                <Score
                    score={score}
                    scale={scale}
                    showDecimals={false}
                    hasComments={true}
                />
            </td>
        </tr>
        {uploads.length ? (
            <tr>
                <td colSpan="3">
                    <UploadLists uploads={uploads} />
                </td>
            </tr>
        ) : null}
    </tbody>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    uploads: PropTypes.array.isRequired
};

export default Comment;
