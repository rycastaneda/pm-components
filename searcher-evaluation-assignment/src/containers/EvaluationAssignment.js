import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Select  from 'react-select';
import * as actions from '../actions/evaluationAssignmentsAction';

class EvaluationAssignment extends Component {

    componentDidMount() {
        const { actions } = this.props;
        actions.fetchTemplateList();
    }

    render() {
        /* const { boilerplate } = this.props; */
        const { evaluationTemplates,
            evaluationLinks,
            evaluationAssignees,
            evaluationLinkedTo,
            selectedAssignees,
            isBusy,
            actions } = this.props;
        return (
                <form>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label htmlFor="evaluationTemplate">Evaluation Template</label>
                            <select name="evaluationTemplate"
                                id="evaluationTemplate"
                                className="form-control"
                                onChange={ event => actions.fetchEvaluationOnList(event.target.value)}>
                                <option key="-" value={null}>Select Template</option>
                                {evaluationTemplates.map(
                                    (item, index) =>
                                    <option key={index} value={item.id}>{item.label}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    {evaluationLinks.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationIsOn">Evaluation is on</label>
                                <select name="evaluationIsOn"
                                    id="evaluationIsOn"
                                    className="form-control"
                                    onChange={ event => actions.fetchLinkedToList(event.target.value)}>
                                    <option key="-" value={null}>Select evaluation</option>
                                    {evaluationLinks.map(
                                        (item, index) =>
                                        <option key={index} value={item.id}>{item.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>:
                        null
                    }
                    {evaluationLinkedTo.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Linked to</label>
                                <select name="evaluationLink"
                                    id="evaluationLink"
                                    className="form-control"
                                    onChange={
                                        event => actions.fetchAssigneeList(event.target.value)
                                    }>
                                    <option key="-" value={null}>Select..</option>
                                    {evaluationLinkedTo.map(
                                        (item, index) =>
                                        <option key={index} value={item.id}>{item.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }
                    {evaluationAssignees.length > 0  ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="assignees">Assignees debug</label>
                                <div>
                                    <Select name="form-field-name" multi
                                        value={selectedAssignees}
                                        options={evaluationAssignees}
                                        isLoading={isBusy}
                                        onChange={actions.updateSelectedAssignees}
                                        valueRenderer={this.renderValue}/>
                                </div>
                            </div>
                        </div>
                        :null
                    }
                    <div className="row">
                        <div className="col-sm-4">
                            <button title="Save" disabled onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </form>
            );
    }
}

EvaluationAssignment.propTypes = {
    evaluationTemplates: PropTypes.array.isRequired,
    evaluationLinks: PropTypes.array.isRequired,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees:PropTypes.array.isRequired,
    evaluationLinkedTo: PropTypes.array.isRequired,
    isBusy: PropTypes.bool.isRequired,
    actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {

    const {
        evaluationTemplates,
        evaluationLinks,
        evaluationAssignees,
        evaluationLinkedTo,
        selectedAssignees,
        isBusy,
    } = state.evaluationAssignment;

    console.log('map state: ', selectedAssignees);

    return {
        ...ownProps,
        evaluationTemplates,
        evaluationLinks,
        evaluationAssignees,
        evaluationLinkedTo,
        selectedAssignees,
        isBusy,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);  // adds dispatch prop
