import React, { PropTypes } from 'react';

const Comment = ({ staff, comment, date, toggleCommentEdit, isReadOnly }) => (
    <div className="comments-form">
        <div className={`${isReadOnly ? 'col-lg-12 col-sm-12' :  'col-lg-11 col-sm-11'} request-detail`}>
            {comment}
        </div>
        <div className={`${isReadOnly ? '' :  'col-lg-1 col-sm-1'}`}>
            {isReadOnly ? null 
            : <a className="edit" onClick={toggleCommentEdit}>
                <i className="fa fa-edit"></i>
            </a>}
        </div>
        <span className="staff">— {staff}</span>
        <span className="italic">{date}</span>
    </div>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string,
    toggleCommentEdit: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired
};

export default Comment;