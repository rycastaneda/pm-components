import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { initialize } from '../actions/evaluationSubmissionAction';

// import Button from '../components/Button';

class EvaluationSubmission extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(initialize(1));
    }

    render() {
        const { criteriaIds, title, assignmentStatus } = this.props;
        return (
            <div>
                <h1>
                {title} -<small>{assignmentStatus.title}</small>
                </h1>
                { criteriaIds.map(
                    (criteriaId, index) =>
                    <div key={index}>
                        <Criteria criteriaId = {criteriaId} />
                    </div>
                )}
                <div className="pull-right">
                    <button className="btn btn-md">Finish</button>
                </div>
            </div>
        );
    }
}

EvaluationSubmission.propTypes = {
    dispatch: PropTypes.func.isRequired,
    criteriaIds:PropTypes.array.isRequired,
    assignmentStatus:PropTypes.object,
    title: PropTypes.string
};

function mapStateToProps(state) {
    const { criteriaIds, title, assignmentStatus } = state.evaluationSubmission;
    return {
        title,
        criteriaIds,
        assignmentStatus
    };
}

export default connect(mapStateToProps)(EvaluationSubmission);  // adds dispatch prop
