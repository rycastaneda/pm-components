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
        const { criteriaIds } = this.props;
        return (
            <div>
                { criteriaIds.map(
                    (criteriaId, index) =>
                    <div key={index}>
                        <Criteria criteriaId = {criteriaId} />
                    </div>
                )}
            </div>
        );
    }
}

EvaluationSubmission.propTypes = {
    dispatch: PropTypes.func.isRequired,
    criteriaIds:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const { criteriaIds } = state.evaluationSubmission;
    return {
        criteriaIds
    };
}

export default connect(mapStateToProps)(EvaluationSubmission);  // adds dispatch prop
