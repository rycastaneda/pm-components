import React, { PropTypes, Component } from 'react';
import Comment from '../components/Comment';
export default class CommentModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { assignment, fetchComments } = this.props;

        if (
            this.previousAssignment &&
            this.previousAssignment.isShown &&
            assignment.isShown
        ) {
            // if isShown remains unchanged, dont toggle animations
            return;
        }
        // show the elements
        this.modal.className = `modal fade show`;
        this.drop.className = `modal-backdrop fade`;

        this.previousAssignment = assignment;
        if (!assignment) {
            // closing the modal, hide modal and drop again
            setTimeout(() => this.toggleOpacityAnimation(false), 300); // element hides instantly; need significant delay
            return;
        }

        // toggle the opacity animation; wrap into timeout for seamless animation
        setTimeout(() => this.toggleOpacityAnimation(assignment.isShown));

        // if comments is empty; go fetch it
        if (assignment.commentCount && !assignment.comments.length) {
            fetchComments();
        }
    }

    toggleOpacityAnimation(isShown) {
        this.modal.className = `modal fade ${isShown ? 'show in' : ''}`;
        this.drop.className = `modal-backdrop fade ${isShown
            ? 'in'
            : 'hidden'}`;
    }

    render() {
        const { assignment, toggleCommentModal } = this.props;

        return (
            <div>
                <div ref={ref => (this.modal = ref)} className={`modal fade`}>
                    {assignment ? (
                        <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        id={assignment.id}
                                        type="button"
                                        className="close"
                                        onClick={toggleCommentModal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <div className="modal-title">Comments</div>
                                </div>
                                <div className="modal-body comment-lists">
                                    {assignment.comments.length ? assignment.comments.map(comment => (
                                        <Comment
                                            key={comment.id}
                                            {...comment}
                                        />
                                    )) : 'No comments yet'}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        id={assignment.id}
                                        type="button"
                                        className="db-function mar-left-sm"
                                        data-dismiss="modal"
                                        onClick={toggleCommentModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div
                    ref={ref => (this.drop = ref)}
                    className={`modal-backdrop fade `}
                />
            </div>
        );
    }
}

CommentModal.propTypes = {
    assignment: PropTypes.object,
    toggleCommentModal: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired
};
