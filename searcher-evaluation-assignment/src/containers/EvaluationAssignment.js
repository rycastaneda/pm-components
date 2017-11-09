import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    saveAssignment,
    fetchTemplateList,
    fetchAssigneeList,
    fetchLinkedToList,
    fetchEvaluationOnList
}  from '../actions/evaluationAssignmentsAction';

class EvaluationAssignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTemplateId :   null,
            selectedAssigneeId :    null,
            selectedLinkedToId :    null,
            selectedLinkId :    null
        };
        this.onSave = this.onSave.bind(this);
        this.onTemplateSelected = this.onTemplateSelected.bind(this);
        this.onLinkSelected = this.onLinkSelected.bind(this);
        this.onLinkedToSelected = this.onLinkedToSelected.bind(this);
        this.onAssigneeSelected = this.onAssigneeSelected.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchTemplateList());
    }
    onSave() {
        this.props.dispatch(saveAssignment());
    }
    onTemplateSelected(id) {
        this.setState({ selectedTemplateId : id });
        this.props.dispatch(fetchEvaluationOnList(id));
    }
    onLinkSelected(id) {
        this.setState({ selectedLinkId : id });
        this.props.dispatch(fetchLinkedToList(id));
    }
    onLinkedToSelected(id) {
        this.setState({ selectedLinkedToId : id });
        this.props.dispatch(fetchAssigneeList(id));
    }
    onAssigneeSelected(id) {
        this.setState({ selectedAssigneeId : id });
    }
    render() {
        /* const { boilerplate } = this.props; */
        const { evaluationTemplates,
            evaluationLinks,
            evaluationAssignees,
            evaluationLinkedTo } = this.props;
        return (
                <form>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label htmlFor="evaluationTemplate">Evaluation Template</label>
                            <select name="evaluationTemplate"
                                defaultValue={this.state.selectedTemplateId}
                                id="evaluationTemplate"
                                className="form-control"
                                onChange={ event => this.onTemplateSelected(event.target.value)}>
                                <option key="-" value={null}></option>
                                {evaluationTemplates.map(
                                    (item, index) =>
                                    <option key={index} value={item.id}>{item.label}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    {(this.state.selectedTemplateId!==null)?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationIsOn">Evaluation is on</label>
                                <select name="evaluationIsOn"
                                    defaultValue={this.state.selectedLinkId}
                                    id="evaluationIsOn"
                                    className="form-control"
                                    onChange={ event => this.onLinkSelected(event.target.value)}>
                                    <option key="-" value={null}></option>
                                    {evaluationLinks.map(
                                        (item, index) =>
                                        <option key={index} value={item.id}>{item.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>:
                        null
                    }
                    {
                        this.state.selectedLinkId !== null?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Linked to</label>
                                <select name="evaluationLink"
                                    defaultValue={this.state.selectedLinkedToId}
                                    id="evaluationLink"
                                    className="form-control"
                                    onChange={
                                        event => this.onLinkedToSelected(event.target.value)
                                    }>
                                    <option key="-" value={null}></option>
                                    {evaluationLinkedTo.map(
                                        (item, index) =>
                                        <option key={index} value={item.id}>{item.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }
                    {
                        this.state.selectedLinkedToId !== null?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="assignees">Assignees</label>
                                <select name="assignees"
                                    id="assignees"
                                    defaultValue={this.state.selectedAssigneeId}
                                    className="form-control"
                                    onChange={
                                        event => this.onAssigneeSelected(event.target.value)
                                    }>
                                <option key="-" value={null}></option>
                                {evaluationAssignees.map(
                                    (item, index) =>
                                    <option key={index} value={item.id}>{item.label}</option>
                                )}
                                </select>
                            </div>
                        </div>
                        :null
                    }
                    <div className="row">
                        <div className="col-sm-4">
                            <button title="Save" disabled={this.state.selectedAssigneeId===null} onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </form>
            );
    }
}

EvaluationAssignment.propTypes = {
    dispatch: PropTypes.func.isRequired,
    evaluationTemplates: PropTypes.array.isRequired,
    selectedTemplateId: PropTypes.number,
    evaluationLinks: PropTypes.array.isRequired,
    selectedLinkId: PropTypes.number,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssigneeId: PropTypes.number,
    evaluationLinkedTo: PropTypes.array.isRequired,
    selectedLinkedToId: PropTypes.number
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
