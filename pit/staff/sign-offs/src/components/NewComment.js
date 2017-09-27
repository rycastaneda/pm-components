import React, { PropTypes } from 'react';

const NewComment = ({ comment, newCommentRef, submitComment, cancelNewComment }) => (
    <form onSubmit={submitComment}>
        <textarea ref={newCommentRef} defaultValue={comment}></textarea>
        <button className="cancel db-function" onClick={cancelNewComment}>
            <i className="fa fa-times"></i>Cancel
        </button>
        <button className="db-function">
            <i className="fa fa-check"></i>Submit
        </button>
    </form>
);

NewComment.propTypes = {
    comment: PropTypes.string.isRequired,
    newCommentRef: PropTypes.node,
    submitComment: PropTypes.func.isRequired,
    cancelNewComment: PropTypes.func.isRequired
};

export default NewComment;