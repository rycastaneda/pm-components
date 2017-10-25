import React, { PropTypes, Component } from 'react';

class NewComment extends Component { // need to be component instead of functional since we need componentDidMount()
    constructor(props) {
        super(props);
        this.newCommentRef = null;
    }

    componentDidMount() {
        this.newCommentRef.focus();
    }

    render() {
        const { comment, getNewCommentRef, submitComment, cancelNewComment } = this.props;

        return (
            <form onSubmit={submitComment} className="row mar-top">
                <div className="col-lg-12">
                    <textarea 
                        ref={(ref) => {
                            getNewCommentRef(ref);
                            this.newCommentRef = ref;
                        }} 
                        defaultValue={comment}
                        className="form-control"
                        placeholder="New comment for this section">
                    </textarea>
                </div>
                <div className="col-lg-12 mar-top mar-btm">
                    <div className="pull-right">
                        <button type="button" className="cancel db-function mar-r-sm" onClick={cancelNewComment}>
                            <i className="fa fa-times"></i>Cancel
                        </button>
                        <button className="db-function">
                            <i className="fa fa-check"></i>Submit
                        </button>
                    </div>
                </div> 
                <hr/>
            </form>
        );
    }
} 

NewComment.propTypes = {
    comment: PropTypes.string,
    getNewCommentRef: PropTypes.func,
    submitComment: PropTypes.func.isRequired,
    cancelNewComment: PropTypes.func.isRequired
};

export default NewComment;