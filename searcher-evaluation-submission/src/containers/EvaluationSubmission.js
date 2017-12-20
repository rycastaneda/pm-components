import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { initialize } from '../actions/evaluationSubmissionAction';
import Notification from '../notification/Notification';
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
            <div id="searcher-evaluation-submission" ref ={ element => this.htmlElement = element }>
                <Notification />
                <div className="row">
                    <div className="col-sm-6">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="bs-label bs-label-info">{assignmentStatus.title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                    { criteriaIds.map(
                        (criteriaId, index) =>
                        <div key={index}>
                            <Criteria criteriaId = {criteriaId} />
                        </div>
                    )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 pull-text-right">
                        <button className="btn btn-md">Finish</button>
                    </div>
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
