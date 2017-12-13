import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Select  from 'react-select';
import * as actions from '../actions/evaluationAssignmentsAction';
import * as apiCalls from '../actions/apiActions';
import { selectFromStore } from '../utils/selectFromStore';
import { concatLabelKey } from '../utils/concatLabelKey';
import EvaluationTemplatesDropdown from './components/EvaluationTemplatesDropdown';
import EvaluationTypeDropdown from './components/EvaluationTypeDropdown';
import RfqListDropdown from './components/RfqListDropdown';
import MatchedSuppliersDropdown from './components/MatchedSuppliersDropdown';
import MatchedItemsDropdown from './components/MatchedItemsDropdown';
import EngagementsDropdown from './components/EngagementsDropdown';
import PreferredSuppliersDropdown from './components/PreferredSuppliersDropdown';


class EvaluationAssignment extends Component {

    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.fetchEvaluationTemplates();
        apiActions.fetchAssigneesStaff();
    }

    render() {
        const {
            evaluationTemplates,
            selectedTemplateId,
            evaluationAssignees,
            selectedAssignees,
            matchedSuppliers,
            matchedItems,
            evaluationTypeSelected,
            rfqTypeSelectedId,
            selectedAssignmentEntityInstanceId,
            actions } = this.props;

        return (
                <form>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label htmlFor="evaluationTemplate">Evaluation Template</label>
                            <EvaluationTemplatesDropdown evaluationTemplates={evaluationTemplates} />
                        </div>
                    </div>

                    { selectedTemplateId !== '' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationIsOn">Evaluation Type</label>
                                <EvaluationTypeDropdown />
                            </div>
                        </div>
                        : null
                    }

                    { evaluationTypeSelected === '2' || evaluationTypeSelected === '1' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">RFQ List</label>
                                <RfqListDropdown />
                            </div>
                        </div>
                        : null
                    }

                    { rfqTypeSelectedId !== '' && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Matched Suppliers</label>
                                <MatchedSuppliersDropdown matchedSuppliers={matchedSuppliers} />
                            </div>
                        </div>
                        : null
                    }

                    { matchedItems.length > 0 && evaluationTypeSelected === '2' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Matched Items</label>
                                <MatchedItemsDropdown matchedItems={matchedItems} />
                            </div>
                        </div>
                        : null
                    }

                    { evaluationTypeSelected === '4' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Engagements</label>
                                <EngagementsDropdown />
                            </div>
                        </div>
                        : null
                    }

                    { evaluationTypeSelected === '3' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Preferred Suppliers</label>
                                <PreferredSuppliersDropdown />
                            </div>
                        </div>
                        : null
                    }

                    { selectedAssignmentEntityInstanceId !== ''  ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="assignees">Evaluation Assignees</label>
                                <div>
                                    <Select
                                        labelKey="fullName"
                                        closeOnSelect={true}
                                        multi
                                        onChange={actions.updateSelectedAssignees}
                                        options={evaluationAssignees}
                                        placeholder="Select assignees"
                                        removeSelected={true}
                                        value={selectedAssignees}
                                    />
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
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees:PropTypes.array.isRequired,
    matchedSuppliers: PropTypes.array.isRequired,
    matchedItems: PropTypes.array.isRequired,
    selectedTemplateId: PropTypes.string.isRequired,
    evaluationTypeSelected: PropTypes.string.isRequired,
    rfqTypeSelectedId: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    selectedAssignmentEntityInstanceId: PropTypes.string.isRequired,
    matchedSuppliersIsLoading: PropTypes.bool,
    actions: PropTypes.object,
    apiActions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        apiActions: bindActionCreators(apiCalls, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {

    const {
        evaluationTypeSelected,
        selectedAssignees,
        isLoading,
        selectedTemplateId,
        selectedAssignmentEntityInstanceId,
        rfqTypeSelectedId,
        matchedSupplierId,
    } = state.evaluationAssignment;

    const evaluationTemplates = selectFromStore(state.evaluationAssignment, '/evaluation-templates', 'evaluationTemplates');
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));
    const matchedSuppliers = selectFromStore(state.evaluationAssignment, `/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers`, 'matchedSuppliers');
    const matchedItems = selectFromStore(state.evaluationAssignment, `/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`, 'matchedItems');

    console.log(`selected by endpoint from store with rfqId-${rfqTypeSelectedId} suppId-${matchedSupplierId} and :`, matchedItems);

    return {
        ...ownProps,
        selectedTemplateId,
        evaluationTemplates,
        matchedSuppliers,
        matchedItems,
        evaluationTypeSelected,
        evaluationAssignees,
        selectedAssignees,
        selectedAssignmentEntityInstanceId,
        rfqTypeSelectedId,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);  // adds dispatch prop
