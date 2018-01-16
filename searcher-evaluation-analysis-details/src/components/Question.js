import React, { PropTypes, Component } from 'react';
import Comment from './Comment';
import Score from './Score';

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
        const {
            number,
            questionTitle,
            totalScore,
            scale,
            comments
        } = this.props;

        const listComponents = comments.length ? (
            comments.map(comment => (
                <Comment key={comment.id} {...comment} scale={scale} />
            ))
        ) : (
            <tr>
                <td className="td-center" colSpan="3">
                    No comments yet
                </td>
            </tr>
        );

        const iconClass = `fa mar-left-25 pointer toggle-comments ${this.state
            .isShown
            ? 'fa-chevron-up'
            : 'fa-chevron-down'}`;

        return (
            <div className="questions">
                <table className="questions" width="100%">
                    <tbody>
                        <tr onClick={this.toggleComments} className="pointer">
                            <td width="75%">
                                <p>
                                    <span className="circle">{`${number} `}</span>
                                    <span className="question-title">
                                        {questionTitle}
                                    </span>
                                </p>
                            </td>
                            <td className="text-right" width="25%">
                                {scale !== 1 ? (
                                    <Score
                                        score={totalScore}
                                        scale={scale}
                                        showDecimals={true}
                                        hasComments={!!comments.length}
                                    />
                                ) : null}

                                <i
                                    className={iconClass}
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
                                                <th>Assignee</th>
                                                <th>Comment</th>
                                                <th className="text-right">
                                                    {scale !== 1
                                                        ? 'Score'
                                                        : 'Answer'}
                                                </th>
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
    scale: PropTypes.number,
    comments: PropTypes.array
};

export default Question;
