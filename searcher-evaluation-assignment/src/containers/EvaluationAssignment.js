import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Select  from 'react-select';
import * as actions from '../actions/evaluationAssignmentsAction';
import { selectFromStore } from '../utils/selectFromStore';

class EvaluationAssignment extends Component {

    componentDidMount() {
        const { actions } = this.props;
        actions.fetchTemplateList();
        actions.fetchAssigneeList();
    }

    render() {
        /* const { boilerplate } = this.props; */
        const {
            evaluationTemplates,
            evaluationTypes,
            evaluationAssignees,
            selectedAssignees,
            evaluationTypesRfq,
            matchedSuppliers,
            matchedItems,
            evaluationEngagements,
            evaluationSuppliers,
            isLoading,
            evaluationTypeSelected,
            selectedAssignmentEntityInstanceId,
            actions } = this.props;
        return (
                <form>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label htmlFor="evaluationTemplate">Evaluation Template</label>
                            <select name="evaluationTemplate"
                                id="evaluationTemplate"
                                className="form-control"
                                onChange={ evt => actions.evaluationTemplateUpdateChange(evt.target.value) }>
                                <option key="-" value={null}>Select Template</option>
                                { evaluationTemplates.map(
                                    item => <option key={item.id} value={item.id}>{item.title}</option>
                                ) }
                            </select>
                        </div>
                    </div>
                    { evaluationTypes.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationIsOn">Evaluation Type</label>
                                <select name="evaluationIsOn"
                                    id="evaluationIsOn"
                                    className="form-control"
                                    onChange={ evt => actions.updateChangeEvaluationType(evt.target.value) }>
                                    <option key="-" value={null}>{!isLoading ? 'Select..' : 'Loading...'}</option>
                                    {evaluationTypes.map(
                                        item => <option key={item.id} value={item.id}>{item.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>:
                        null
                    }
                    { evaluationTypesRfq.length > 0 && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">RFQ List</label>
                                <select name="evaluationLink"
                                    id="evaluationLink"
                                    className="form-control"
                                    onChange={
                                        event => actions.fetchMatchedSuppliers(event.target.value)
                                    }>
                                    <option key="-" value={null}>Select..</option>
                                    {evaluationTypesRfq.map(
                                        (item, index) =>
                                        <option key={index} value={item.id}>{item.quoteTitle}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }
                    { matchedSuppliers.length > 0  && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Matched Suppliers</label>
                                <select name="evaluationLink"
                                        id="evaluationLink"
                                        className="form-control"
                                        onChange={
                                            event => actions.updateChangeMatchedSuppliers(event.target.value)
                                        }>
                                    <option key="-" value={null}>Select..</option>
                                    { matchedSuppliers.map(
                                        (item, index) =>
                                            <option key={index} value={item.id}>{item.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }
                    { matchedItems.length > 0 && evaluationTypeSelected === '2' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Matched Items</label>
                                <select name="evaluationLink"
                                        id="evaluationLink"
                                        className="form-control"
                                        onChange={
                                            event => actions.updateChangeMatchedItems(event.target.value)
                                        }>
                                    <option key="-" value={null}>Select..</option>
                                    {matchedItems.map(
                                        (item, index) =>
                                            <option key={index} value={item.id}>{item.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }

                    { evaluationEngagements.length > 0 && evaluationTypeSelected === '4' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Engagements</label>
                                <select name="evaluationLink"
                                        id="evaluationLink"
                                        className="form-control"
                                        onChange={
                                            event => actions.updateChangeEngagements(event.target.value)
                                        }>
                                    <option key="-" value={null}>{!isLoading ? 'Select..' : 'Loading...'}</option>
                                    { evaluationEngagements.map(
                                        (item, index) =>
                                            <option key={index} value={item.id}>{item.engagementText}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }

                    { evaluationSuppliers.length > 0 && evaluationTypeSelected === '3' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Preferred Suppliers</label>
                                <select name="evaluationLink"
                                        id="evaluationLink"
                                        className="form-control"
                                        onChange={
                                            event => actions.updateChangeSuppliers(event.target.value)
                                        }>
                                    <option key="-" value={null}>{!isLoading ? 'Select..' : 'Loading...'}</option>
                                    { evaluationSuppliers.map(
                                        (item, index) =>
                                            <option key={index} value={item.id}>{item.supplier.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        : null
                    }

                    { selectedAssignmentEntityInstanceId !== ''  ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="assignees">Assignees</label>
                                <div>
                                    <Select name="form-field-name"
                                        multi
                                        labelKey="lastName"
                                        value={selectedAssignees}
                                        options={evaluationAssignees}
                                        isLoading={isLoading}
                                        onChange={actions.updateSelectedAssignees}
                                        valueRenderer={this.renderValue} />
                                </div>
                            </div>
                        </div>
                        : null
                    }

                    {this.renderSaveButton()}

                </form>
            );
    }

    renderSaveButton() {
        const { selectedAssignmentEntityInstanceId, selectedAssignees, isLoading, actions } = this.props;

        if (selectedAssignmentEntityInstanceId === '' || selectedAssignees.length === 0) {
            return null;
        }

        return (
            <div className="row">
                <div className="col-sm-4">
                    <button title="Save" type="button" onClick={actions.createAssignment}>{isLoading ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        );
    }
}

EvaluationAssignment.propTypes = {
    evaluationTemplates: PropTypes.array.isRequired,
    evaluationTypes: PropTypes.array.isRequired,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees:PropTypes.array.isRequired,
    evaluationTypesRfq: PropTypes.array.isRequired,
    matchedSuppliers: PropTypes.array.isRequired,
    matchedItems: PropTypes.array.isRequired,
    evaluationEngagements: PropTypes.array.isRequired,
    evaluationSuppliers: PropTypes.array.isRequired,
    evaluationTypeSelected: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    selectedAssignmentEntityInstanceId: PropTypes.string.isRequired,
    actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {

    const {
        evaluationTypeSelected,
        selectedAssignees,
        isLoading,
        selectedAssignmentEntityInstanceId,
    } = state.evaluationAssignment;

    const evaluationTemplates = selectFromStore(state.evaluationAssignment.evaluationTemplates, 'evaluation-templates', 'evaluationTemplates');
    const evaluationAssignees = selectFromStore(state.evaluationAssignment.evaluationAssignees, 'evaluation-assignees', 'staff');

    const evaluationTypes = selectFromStore(state.evaluationAssignment.evaluationTypes, 'evaluation-types', 'evaluationTemplateAssignmentTypes');
    const evaluationTypesRfq = selectFromStore(state.evaluationAssignment.evaluationTypesRfq, 'evaluation-rfq', 'requestForQuotations');
    const matchedSuppliers = selectFromStore(state.evaluationAssignment.matchedSuppliers, 'matched-suppliers', 'matchedSuppliers');
    const matchedItems = selectFromStore(state.evaluationAssignment.matchedItems, 'matched-items', 'matchedItems');
    const evaluationEngagements = selectFromStore(state.evaluationAssignment.evaluationEngagements, 'engagements', 'engagements');
    const evaluationSuppliers = selectFromStore(state.evaluationAssignment.evaluationSuppliers, 'suppliers', 'preferredSuppliers');

    console.log('select from store: ', evaluationTypes);

    return {
        ...ownProps,
        evaluationTypes,
        evaluationTemplates,
        evaluationTypesRfq,
        matchedSuppliers,
        matchedItems,
        evaluationTypeSelected,
        evaluationEngagements,
        evaluationSuppliers,
        evaluationAssignees,
        selectedAssignees,
        selectedAssignmentEntityInstanceId,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);  // adds dispatch prop
