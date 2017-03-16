import React, { Component, PropTypes } from 'react';

class CommentsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentsInput: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleSubmit() {
        return this.props.updateSelection(null, this.state.commentsInput);
    }

    handleDeleteComment() {
        return this.props.updateSelection(null, null);
    }

    render() {
        const { comment, showForm } = this.props;
        return (
            <div className="comments-form">
                <p className="comments-form__title">Comments </p>
                <div className="row">
                    <div className="col-lg-11 comments-form__comment">{comment}</div>
                    {comment && <div className="col-lg-1 text-center">
                        <a className="fa fa-trash comments-form__delete" onClick={this.handleDeleteComment}></a>
                    </div>}
                    <div className="clearfix"></div>
                </div>
                {showForm ? 
                    <div>
                        <textarea 
                            onChange={(e) => {
                                this.setState({
                                    commentsInput: e.target.value
                                });
                            }}
                            className="comments-form__textarea valid"/>
                        <button onClick={this.handleSubmit} 
                            className="btn comments-form__submit" 
                            type="button" 
                            disabled={!this.state.commentsInput ? 'disabled' : '' }>
                            Submit
                        </button>
                    </div>
                : null}
            </div>
        );
    }
}

CommentsForm.propTypes = {
    updateSelection: PropTypes.func.isRequired,
    comment: PropTypes.string,
    showForm: PropTypes.bool.isRequired
};

export default CommentsForm;
