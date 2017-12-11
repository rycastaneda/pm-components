import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { initialize } from '../actions/evaluationSubmissionAction';

// import Button from '../components/Button';

class EvaluationSubmission extends Component {

    constructor(props) {
        super(props);
        this.element = null;
    }

    componentDidMount() {
        let rootElement = this.htmlElement.closest('[data-component=\'searcher-evaluation-submission\']');
        let assignmentId = rootElement.getAttribute('data-evaluation-assignment-id');
        this.props.dispatch(initialize(Number(assignmentId)));
    }

    render() {
        const { criteriaIds, title, assignmentStatus } = this.props;
        return (
            <div ref ={ element => this.htmlElement = element }>
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
