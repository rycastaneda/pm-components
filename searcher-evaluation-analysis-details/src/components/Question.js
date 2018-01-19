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
            staffAssigneeId,
            staffAssignee,
            comments
        } = this.props;

        const placeholder = (
            <tbody key={staffAssigneeId}>
                <tr>
                    <td>
                        <strong>{staffAssignee}</strong>
                    </td>
                    <td className="td-center" colSpan="2">
                        No response recorded
                    </td>
                </tr>
            </tbody>
        );

        const getComments = () => {
            let includesStaffAssigneeId = false;
            let components = comments.map(comment => {
                includesStaffAssigneeId = +comment.staffId === staffAssigneeId;
                return (
                    <Comment key={comment.staffId} {...comment} scale={scale} />
                );
            });

            if (!includesStaffAssigneeId) {
                // add dummy comment for staff assignee
                components.push(placeholder);
            }

            return components;
        };

        const listComponents = comments.length ? getComments() : placeholder;

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
                                        {listComponents}
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
    staffAssignee: PropTypes.string.isRequired,
    staffAssigneeId: PropTypes.number.isRequired,
    totalScore: PropTypes.number,
    scale: PropTypes.number,
    comments: PropTypes.array
};

export default Question;
