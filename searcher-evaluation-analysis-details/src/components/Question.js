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
        const { number, questionTitle, totalScore, comments } = this.props;
        const listComponents = comments.length ? (
            comments.map(comment => <Comment key={comment.id} {...comment} />)
        ) : (
            <tr>
                <td className="td-center" colSpan="3">
                    No comments yet
                </td>
            </tr>
        );

        return (
            <div className="row">
                <div className="mar-top-sm col-sm-1 text-right">{`${number}. `}</div>
                <div className="mar-top-sm col-sm-9">
                    <p className="question-title">{questionTitle}</p>
                </div>
                <div className="col-sm-1 scorebox">
                    <span className="label label-lg label-plantminer">
                        {totalScore}
                    </span>
                </div>
                <div
                    className="mar-top-sm col-sm-1 toggle-comments"
                    onClick={this.toggleComments}>
                    <i
                        className={`fa pointer ${this.state.isShown
                            ? 'fa-chevron-down'
                            : 'fa-chevron-right'}`}
                    />
                </div>

                {this.state.isShown ? (
                    <div className="col-sm-12">
                        <table className="table db-table">
                            <thead>
                                <tr>
                                    <th>Staff</th>
                                    <th>Comment</th>
                                    <th className="td-center">Score</th>
                                </tr>
                            </thead>
                            <tbody>{listComponents}</tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        );
    }
}

Question.propTypes = {
    number: PropTypes.number.isRequired,
    questionTitle: PropTypes.string.isRequired,
    totalScore: PropTypes.number,
    comments: PropTypes.array
};

export default Question;
