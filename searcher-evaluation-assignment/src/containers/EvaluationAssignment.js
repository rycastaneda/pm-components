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
                    { evaluationTypes.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationIsOn">Evaluation Type</label>
                                <EvaluationTypeDropdown evaluationTypes={evaluationTypes} isLoading={isLoading} />
                            </div>
                        </div>
                        : null
                    }

                    { evaluationTypesRfq.length > 0 && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">RFQ List</label>
                                <RfqListDropdown evaluationTypesRfq={evaluationTypesRfq} />
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

                    { evaluationEngagements.length > 0 && evaluationTypeSelected === '4' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Engagements</label>
                                <EngagementsDropdown evaluationEngagements={evaluationEngagements} isloading={isLoading} />
                            </div>
                        </div>
                        : null
                    }

                    { evaluationSuppliers.length > 0 && evaluationTypeSelected === '3' ?
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label htmlFor="evaluationLink">Preferred Suppliers</label>
                                <PreferredSuppliersDropdown evaluationSuppliers={evaluationSuppliers} isLoading={isLoading} />
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
    evaluationTypes: PropTypes.array.isRequired,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees:PropTypes.array.isRequired,
    evaluationTypesRfq: PropTypes.array.isRequired,
    matchedSuppliers: PropTypes.array.isRequired,
    matchedItems: PropTypes.array.isRequired,
    evaluationEngagements: PropTypes.array.isRequired,
    evaluationSuppliers: PropTypes.array.isRequired,
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
        selectedAssignmentEntityInstanceId,
        rfqTypeSelectedId,
        matchedSupplierId,
    } = state.evaluationAssignment;

    const evaluationTemplates = selectFromStore(state.evaluationAssignment, '/evaluation-templates', 'evaluationTemplates');
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));
    const evaluationTypes = selectFromStore(state.evaluationAssignment, '/evaluation-template-assignment-types', 'evaluationTemplateAssignmentTypes');
    const evaluationEngagements = selectFromStore(state.evaluationAssignment, '/engagements', 'engagements');
    const evaluationSuppliers = selectFromStore(state.evaluationAssignment, '/preferred-suppliers', 'preferredSuppliers');
    const evaluationTypesRfq = selectFromStore(state.evaluationAssignment, '/request-for-quotations', 'requestForQuotations');
    const matchedSuppliers = selectFromStore(state.evaluationAssignment, `/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers`, 'matchedSuppliers');
    const matchedItems = selectFromStore(state.evaluationAssignment, `/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`, 'matchedItems');

    console.log(`selected by endpoint from store with rfqId-${rfqTypeSelectedId} suppId-${matchedSupplierId} and :`, matchedItems);

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
        rfqTypeSelectedId,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);  // adds dispatch prop
