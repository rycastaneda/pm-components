import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateState, resetState, incrementCounter, decrementCounter } from '../actions/evaluationSubmissionAction';
import Button from '../components/Button';

class EvaluationSubmission extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleOnClick = this.handleOnClick.bind(this);
        this.resetState = this.resetState.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    handleOnClick() {
        return this.props.dispatch(updateState());
    }

    resetState() {
        return this.props.dispatch(resetState());
    }

    increment() {
        return this.props.dispatch(incrementCounter());
    }

    decrement() {
        return this.props.dispatch(decrementCounter());
    }

    render() {
        const { evaluationSubmission } = this.props;

        return (
            <div>
                <h1>Here it comes......

                {evaluationSubmission.state}
                </h1>
                <Button title="Click" onClick={this.handleOnClick}/>
                <Button title="Reset state" onClick={this.resetState}/>
                <Button title="Increment Counter" onClick={this.increment}/>
                <Button title="Decrement Counter" onClick={this.decrement}/>
            </div>
        );
    }
}

EvaluationSubmission.propTypes = {
    dispatch: PropTypes.func.isRequired,
    evaluationSubmission: PropTypes.object.isRequired
}; 

function mapStateToProps(state) {
    const { evaluationSubmission } = state;

    return {
        evaluationSubmission
    };
}

export default connect(mapStateToProps)(EvaluationSubmission);  // adds dispatch prop
