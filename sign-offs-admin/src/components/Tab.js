import React, { PropTypes } from 'react';
import Loader from './Loader';
import NewComment from './NewComment';
import Question from './Question';
import Comment from './Comment';

const Tab = ({
    currentTab,
    comments,
    questions,
    isReadOnly,
    currentStaffId,
    toggleCommentEdit,
    submitComment,
    deleteComment
}) => {
    const tabs = {
        questions: questions.length ? (
            questions.map((question, index) => {
                return (
                    <div key={index}>
                        <Question
                            uploads={question.uploads}
                            question={question.question}
                            answer={question.answer}
                            type={question.type}
                        />
                    </div>
                );
            })
        ) : (
            <div>No questions yet.</div>
        ),
        comments: comments.length ? (
            comments.map((comment, index) => {
                let loader = <Loader icon="-small" />;
                let content = comment.isEditing ? (
                    <NewComment
                        comment={comment.text}
                        getNewCommentRef={input => (comment.ref = input)}
                        cancelNewComment={toggleCommentEdit(comment)}
                        submitComment={submitComment(comment)}
                    />
                ) : (
                    <Comment
                        comment={comment.text}
                        date={comment.date}
                        staff={comment.staff}
                        isReadOnly={
                            isReadOnly || +comment.staffId !== +currentStaffId
                        }
                        toggleCommentEdit={toggleCommentEdit(comment)}
                        deleteComment={deleteComment(comment.id)}
                    />
                );

                return (
                    <div key={index} className="pos-relative">
                        {comment.isLoading ? loader : null}
                        {content}
                    </div>
                );
            })
        ) : (
            <div>No comments yet.</div>
        )
    };

    return <div>{currentTab ? tabs[currentTab] : null}</div>;
};

Tab.propTypes = {
    currentTab: PropTypes.string,
    comments: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    currentStaffId: PropTypes.number.isRequired,
    toggleCommentEdit: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    submitComment: PropTypes.func.isRequired
};

export default Tab;
