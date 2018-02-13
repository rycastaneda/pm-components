import React, { PropTypes } from 'react';
const Comment = ({
    staff,
    text,
    date,
    toggleCommentEdit,
    deleteComment,
    isReadOnly
}) => {
    const actions = (
        <div className="pull-right">
            <a className="change-comment mar-r-sm" onClick={toggleCommentEdit}>
                <i className="fa fa-edit" />
            </a>
            <a className="delete-comment" onClick={deleteComment}>
                <i className="fa fa-close" />
            </a>
        </div>
    );

    const staffInfo = `— ${staff} on ${date}`;

    return (
        <div className="pad-btm font-rg">
            <div className="row">
                <div className={`${isReadOnly ? ' col-xs-12' : ' col-xs-11'}`}>
                    <p className="pad-btm-sm">{text}</p>
                    <strong className="staff">{staffInfo}</strong>
                </div>
                <div className={`${isReadOnly ? '' : 'col-xs-1'}`}>
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
