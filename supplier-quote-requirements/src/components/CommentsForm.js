import React, { Component, PropTypes } from 'react';

class CommentsForm extends Component {

    constructor(props) {
        super(props);
        this.commentsInput = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (!this.commentsInput.value) {
            return;
        }

        return this.props.updateSelection(null, this.commentsInput.value);
    }

    render() {
        const { comment } = this.props;

        return (
            <div className="comments-form">
                <p className="comments-form__title">Comments</p>
                <p>{comment}</p>
                <textarea 
                    ref={(ref) => {
                        this.commentsInput = ref;
                    }}
                    className="comments-form__textarea valid"/>
                <button onClick={this.handleSubmit} className="btn comments-form__submit" type="submit">Submit</button>
            </div>
        );
    }
}

CommentsForm.propTypes = {
    updateSelection: PropTypes.func.isRequired,
    comment: PropTypes.string
};

export default CommentsForm;
