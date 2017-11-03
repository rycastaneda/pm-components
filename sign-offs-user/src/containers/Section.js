import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Tab from '../components/Tab';
import NewComment from '../components/NewComment';
import Loader from '../components/Loader';

import { toggleSectionCollapse, switchSectionTab } from '../actions/section';

import { changeStaffResponse } from '../actions/staff';

import {
    toggleCommentBox,
    toggleCommentEdit,
    submitEditComment,
    submitNewComment,
    deleteComment
} from '../actions/comments';

import { fetchQuestions } from '../actions/questions';

class Section extends Component {
    constructor(props) {
        super(props);
        this.newComment = {
            ref: null,
            comment: ''
        };
        this.submitComment = this.submitComment.bind(this);
        this.toggleCommentEdit = this.toggleCommentEdit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.toggleSectionCollapse = this.toggleSectionCollapse.bind(this);
    }

    submitComment(comment = this.newComment, isEditing) {
        const { id, dispatch } = this.props;

        return e => {
            e.preventDefault();
            if (comment.ref.value === comment.comment) {
                return;
            }

            dispatch(
                isEditing
                    ? submitEditComment(id, comment.id, comment.ref.value)
                    : submitNewComment(id, comment.ref.value)
            );
            comment.ref.value = '';
        };
    }

    toggleCommentEdit(comment = this.newComment, isEditing) {
        const { id, dispatch } = this.props;
        return () => {
            dispatch(
                isEditing ? toggleCommentEdit(comment.id) : toggleCommentBox(id)
            );

            if (comment.ref) {
                comment.ref.focus();
            }
        };
    }

    deleteComment(commentId) {
        const { id, dispatch } = this.props;

        return () => {
            if (confirm('Are you sure you want to delete this comment?')) {
                dispatch(deleteComment(id, commentId));
            }
        };
    }

    toggleSectionCollapse() {
        const { id, isCollapsed, dispatch } = this.props;

        dispatch(toggleSectionCollapse(id));
        if (!isCollapsed) {
            dispatch(fetchQuestions(id));
        }
    }

    render() {
        const {
            id,
            dispatch,
            title,
            currentTab,
            isCollapsed,
            isAddingNewComment,
            isLoading,
            questions,
            comments,
            responses
        } = this.props;

        const { isReadOnly, currentStaffId } = this.props.ui;

        const response = responses.length ? responses.pop() : false;

        const icon = {
            approved: 'fa-check-circle bs-callout-success',
            'not approved': 'fa-times-circle bs-callout-danger',
            'in progress': 'fa-gears bs-callout-warning',
            pending: 'fa-exclamation-circle bs-callout-warning'
        };

        let newCommentForm = null;

        if (currentTab === 'comments') {
            newCommentForm = isAddingNewComment ? (
                <NewComment
                    getNewCommentRef={input => (this.newComment.ref = input)}
                    cancelNewComment={this.toggleCommentEdit(id, false)}
                    submitComment={this.submitComment(this.newComment)}
                />
            ) : (
                <button
                    className="db-function"
                    onClick={this.toggleCommentEdit()}>
                    Add Comment
                </button>
            );
        }

        return (
            <div className="pmaccordion pmaccordion--impact">
                <a
                    onClick={this.toggleSectionCollapse}
                    className={`toggle-section pmaccordion__head ${isCollapsed ||
                        'collapsed'}`}>
                    <div className="row-title">
                        <span className="pull-left pmaccordion__title">
                            {title}
                        </span>
                        <span className="pull-right status-icon">
                            <i
                                className={`fa ${response
                                    ? icon[response.status.toLowerCase()]
                                    : ''}`}
                            />
                        </span>
                        <div className="clearfix" />
                    </div>
                </a>
                <div className={`collapse pad-hor ${isCollapsed ? 'in' : ''}`}>
                    <Header
                        currentTab={currentTab}
                        status={response ? response.status : ''}
                        switchSectionTab={tab =>
                            dispatch(switchSectionTab(id, tab))}
                        isLoading={!!response.staffLoading}
                        toggleSectionStatus={newStatus =>
                            dispatch(
                                changeStaffResponse(
                                    response.staffId,
                                    response.id,
                                    newStatus.value
                                )
                            )}
                        isReadOnly={isReadOnly}
                    />
                    {isLoading ? (
                        <Tab
                            currentTab={currentTab}
                            comments={comments}
                            questions={questions}
                            isReadOnly={isReadOnly}
                            currentStaffId={currentStaffId}
                            submitComment={comment =>
                                this.submitComment(comment, submitEditComment)}
                            toggleCommentEdit={comment =>
                                this.toggleCommentEdit(comment, true)}
                            deleteComment={id => this.deleteComment(id)}
                        />
                    ) : null}
                    <div className="text-center mar-top mar-btm pos-relative">
                        {isLoading ? <Loader icon="-small" /> : null}
                        {newCommentForm}
                    </div>
                </div>
            </div>
        );
    }
}

Section.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    currentTab: PropTypes.string,
    isCollapsed: PropTypes.bool.isRequired,
    isAddingNewComment: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    responses: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    ui: PropTypes.shape({
        isReadOnly: PropTypes.bool.isRequired,
        currentStaffId: PropTypes.number.isRequired
    })
};

export default connect(state => {
    return { ui: state.ui };
})(Section); // adds dispatch prop
