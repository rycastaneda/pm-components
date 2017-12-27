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
            <div className="questions">
            <table className="questions" width="100%">
                <tbody>
                    <tr>
                        <td width="80%"><p><span className="circle">{`${number} `}</span> {questionTitle}</p></td>
                        <td width="10%">
                            <span className="label label-lg label-plantminer">
                                {totalScore}
                            </span>
                        </td>
                        <td className="text-right" width="10%">
                        <i
                            className={`fa pointer toggle-comments ${this.state.isShown
                                ? 'fa-chevron-up'
                                : 'fa-chevron-down'}`}
                            onClick={this.toggleComments}
                        />
                        </td>
                    </tr>
                    {this.state.isShown ? (
                        <tr>
                            <td colSpan="4">
                            <table className="reports" width="100%">
                                <thead>
                                    <tr>
                                        <th>Staff</th>
                                        <th>Comment</th>
                                        <th className="text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody>{listComponents}</tbody>
                            </table>
                            <hr />
                        </td>
                        </tr>
                    ) : null}


                </tbody>
            </table>


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
