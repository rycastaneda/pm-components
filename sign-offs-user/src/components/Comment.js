import React, { PropTypes } from 'react';

const Comment = ({ staff, text, date, toggleCommentEdit, deleteComment, isReadOnly }) => {
    const actions = (
        <div className="pull-right">
            <a className="change-comment mar-r-sm" onClick={toggleCommentEdit}>
                <i className="fa fa-edit"></i>
            </a>
            <a className="delete-comment" onClick={deleteComment}>
                <i className="fa fa-close"></i>
            </a>
        </div>
    );

    return (
        <div className="pad-btm font-rg">
            <div className="row">
                <div className={`${isReadOnly ? 'col-lg-12 col-sm-12' :  'col-lg-11 col-sm-11'}`}>
                    <p className="pad-btm-sm">{text}</p>
                    <strong className="staff">{`— ${staff} ${date}`}</strong>
                </div>
                <div className={`${isReadOnly ? '' :  'col-lg-1 col-sm-1'}`}>
                    {isReadOnly ? null : actions}
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string,
    toggleCommentEdit: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired
};

export default Comment;