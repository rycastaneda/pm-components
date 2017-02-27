import React, { PropTypes } from 'react';

const CommentsForm = ({ handleCommentsSave, handleCommentsUpdate, commentsText }) => (
    <div className="comments-form">
        <p className="comments-form__title">Comments</p>
        <textarea className="comments-form__textarea"
                  defaultValue={commentsText}
                  onChange={handleCommentsUpdate}/>
        <button className="btn comments-form__submit"
                onClick={handleCommentsSave}>Save
        </button>
    </div>
);

CommentsForm.propTypes = {
    handleCommentsSave: PropTypes.func.isRequired,
    handleCommentsUpdate: PropTypes.func.isRequired,
    commentsText: PropTypes.string
};

export default CommentsForm;