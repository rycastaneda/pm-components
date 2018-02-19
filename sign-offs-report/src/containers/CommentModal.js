import React, { PropTypes, Component } from 'react';
import Comment from '../components/Comment';
export default class CommentModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { isShown } = this.props;
        if (this.previousShown && isShown) {
            // if isShown remains unchanged, dont toggle animations
            return;
        }
        // show the elements
        this.modal.className = `modal fade show`;
        this.drop.className = `modal-backdrop fade`;
        this.previousShown = isShown;
        if (!isShown) {
            // closing the modal, hide modal and drop again
            setTimeout(() => this.toggleOpacityAnimation(false), 300); // element hides instantly; need significant delay
            return;
        }

        // toggle the opacity animation; wrap into timeout for seamless animation
        setTimeout(() => this.toggleOpacityAnimation(isShown));
    }

    toggleOpacityAnimation(isShown) {
        this.modal.className = `modal fade ${isShown ? 'show in' : ''}`;
        this.drop.className = `modal-backdrop fade ${isShown
            ? 'in'
            : 'hidden'}`;
    }

    render() {
        const { id, comments, toggleCommentModal } = this.props;
        return (
            <div>
                <div ref={ref => (this.modal = ref)} className={`modal fade`}>
                    {id ? (
                        <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        id={id}
                                        type="button"
                                        className="close"
                                        onClick={toggleCommentModal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <div className="modal-title">Comments</div>
                                </div>
                                <div className="modal-body comment-lists">
                                    {comments.length
                                        ? comments.map(comment => (
                                              <Comment
                                                  key={comment.id}
                                                  {...comment}
                                              />
                                          ))
                                        : 'No comments yet'}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        id={id}
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
    id: PropTypes.number,
    comments: PropTypes.array,
    isShown: PropTypes.bool,
    toggleCommentModal: PropTypes.func.isRequired
};
