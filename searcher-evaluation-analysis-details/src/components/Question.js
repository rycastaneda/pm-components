import React, { PropTypes, Component } from 'react';
import Comment from './Comment';

class Question extends Component {
    constructor(props) {
        super(props);
        this.toggleComments = this.toggleComments.bind(this);
        this.state = {
            isShown: false
        };
    }

    toggleComments() {
        this.setState({
            isShown: !this.state.isShown
        });
    }

    render() {
        const { questionTitle, totalScore, comments } = this.props;

        return (
            <div className="row">
                <div className="col-lg-8">
                    <p className="question-title">{questionTitle}</p>
                </div>
                <div className="col-lg-2 scorebox">{totalScore}</div>
                <div
                    className="col-lg-2 toggle-comments"
                    onClick={this.toggleComments}>
                    <i
                        className={`fa pointer ${this.state.isShown
                            ? 'fa-chevron-down'
                            : 'fa-chevron-right'}`}
                    />
                </div>

                {this.state.isShown
                    ? comments.map(comment => (
                          <Comment key={comment.id} {...comment} />
                      ))
                    : null}
            </div>
        );
    }
}

Question.propTypes = {
    questionTitle: PropTypes.string,
    totalScore: PropTypes.number,
    comments: PropTypes.array
};

export default Question;
