import React, { Component, PropTypes } from 'react';

class CommentsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentsInput: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditDisplay = this.handleEditDisplay.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleSubmit() {
        return this.props.updateSelection(null, this.state.commentsInput);
    }

    handleDeleteComment() {
        this.setState({
            commentsInput: ''
        });
        return this.props.updateSelection(null, null);
    }

    handleEditDisplay() {
        this.setState({
            commentsInput: ''
        });
        return this.props.toggleCommentsFieldDisplay();
    }

    render() {
        const { comment, showForm, readOnly } = this.props;
        
        return (
            <div className="comments-form">
                {(comment || showForm) && <div>
                        <p className="comments-form__title">Comments
                            { comment && !readOnly ?
                                <span>
                                    <a onClick={this.handleEditDisplay}><i className="fa fa-edit comments-form__links"></i></a>
                                    <a onClick={this.handleDeleteComment}><i className="fa fa-trash comments-form__links"></i></a>
                                </span>
                            : null}
                         </p>
                    </div>
                }

                {(comment && !showForm) && <div className="row">
                        <div className="col-lg-11 col-xs-11 comments-form__comment">
                            {comment}
                        </div>
                    </div>
                }

                {showForm ?
                    <div>
                        <textarea
                            placeholder="Add comment for quote requirement"
                            value={(this.state.commentsInput && this.state.commentsInput) || (comment && comment) || ''}
                            onChange={(e) => {
                                this.setState({
                                    commentsInput: e.target.value
                                });
                            }}
                            className="comments-form__textarea valid"/>
                        <button onClick={this.handleSubmit}
                            className="btn comments-form__submit mar-l-sm"
                            type="button"
                            disabled={!this.state.commentsInput ? 'disabled' : '' }>
                            {comment ? `Update` : `Add`}
                        </button>
                        <button onClick={this.handleEditDisplay}
                            className="btn btn-reverse comments-form__submit"
                            type="button">
                            Cancel
                        </button>
                    </div>
                : null}
            </div>
        );
    }
}

CommentsForm.propTypes = {
    toggleCommentsFieldDisplay: PropTypes.func.isRequired,
    updateSelection: PropTypes.func.isRequired,
    comment: PropTypes.string,
    showForm: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default CommentsForm;
