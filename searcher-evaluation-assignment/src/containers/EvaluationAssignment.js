import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateState, resetState, incrementCounter, decrementCounter } from '../actions/evaluationAssignmentsAction';
import Button from '../components/Button';

class EvaluationAssignment extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        /* this.handleOnChange = this.handleOnChange.bind(this);*/
        this.resetState = this.resetState.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.state = {
            selectedTemplateId:     null,
            selectedAssigneeId:     null,
            selectedLinkedToId:     null,
            selectedLinkId:         null
        };
    }

    handleOnSubmit() {
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
        /* const { boilerplate } = this.props; */
        const { evaluationTemplates,
            evaluationLinks,
            evaluationAssignees,
            evaluationLinkedTo,
            selectedTemplateId,
            selectedLinkId,
            selectedAssigneeId,
            selectedLinkedToId } = this.props;
        return (
                <div>
                <form>
                <div className="row">
                <div className="col-sm-4 form-group">
                <label htmlFor="evaluationTemplate">Evaluation Template</label>
                <select name="evaluationTemplate" defaultValue={selectedTemplateId} id="evaluationTemplate" className="form-control"
                onChange={ event => this.setState({ selectedTemplateId: event.target.value })}>
                {evaluationTemplates.map((item, index) => <option key={index} value={item.id}>{item.label}</option>)}
                </select>
                </div>
                </div>
                <div className="row">
                <div className="col-sm-4 form-group">
                <label htmlFor="evaluationIsOn">Evaluation is on</label>
                <select name="evaluationIsOn" defaultValue={selectedLinkId} id="evaluationIsOn" className="form-control"
                onChange = { event => this.setState({ selectedLinkId: event.target.value })}>
                {evaluationLinks.map((item, index) => <option key={index} value={item.id}>{item.label}</option>)}
                </select>
                </div>
                </div>
                <div className="row">
                <div className="col-sm-4 form-group">
                <label htmlFor="evaluationLink">Linked to</label>
                <select name="evaluationLink" defaultValue={selectedLinkedToId} id="evaluationLink" className="form-control"
                onChange = { event => this.setState({ selectedLinkedToId: event.target.value })}>
                {evaluationLinkedTo.map((item, index) => <option key={index} value={item.id}>{item.label}</option>)}
                </select>
                </div>
                </div>
                <div className="row">
                <div className="col-sm-4 form-group">
                <label htmlFor="assignees">Assignees</label>
                <select name="assignees" id="assignees" defaultValue={selectedAssigneeId}  className="form-control"
                onChange = { event => this.setState({ selectedAssigneeId: event.target.value })}>
                {evaluationAssignees.map((item, index) => <option key={index} value={item.id}>{item.label}</option>)}
                </select>
                </div>
                </div>
                <div className="row">
                <div className="col-sm-4">
                <Button title="Submit" onClick={this.handleOnSubmit}/>
                </div>
                </div>
                </form>
                </div>
            );
    }
}

EvaluationAssignment.propTypes = {
    dispatch: PropTypes.func.isRequired,
    evaluationTemplates: PropTypes.array.isRequired,
    selectedTemplateId: PropTypes.number.isRequired,
    evaluationLinks: PropTypes.array.isRequired,
    selectedLinkId: PropTypes.number.isRequired,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssigneeId: PropTypes.number.isRequired,
    evaluationLinkedTo: PropTypes.array.isRequired,
    selectedLinkedToId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    const {
        evaluationTemplates,
        evaluationLinks,
        evaluationAssignees,
        evaluationLinkedTo,
        selectedTemplateId,
        selectedLinkId,
        selectedAssigneeId,
        selectedLinkedToId
    } = state.evaluationAssignment;

    return {
        evaluationTemplates,
        evaluationLinks,
        evaluationAssignees,
        evaluationLinkedTo,
        selectedTemplateId,
        selectedLinkId,
        selectedAssigneeId,
        selectedLinkedToId
    };
}

export default connect(mapStateToProps)(EvaluationAssignment);  // adds dispatch prop
