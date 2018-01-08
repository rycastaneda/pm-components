import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/evaluationAssignmentsAction';
import * as apiCalls from '../actions/apiActions';
import { selectFromStore } from '../utils/selectFromStore';
import EvaluationTemplatesDropdown from './components/EvaluationTemplatesDropdown';
import EvaluationTypeDropdown from './components/EvaluationTypeDropdown';
import RfqListDropdown from './components/RfqListDropdown';
import MatchedSuppliersDropdown from './components/MatchedSuppliersDropdown';
import MatchedItemsDropdown from './components/MatchedItemsDropdown';
import EngagementsDropdown from './components/EngagementsDropdown';
import PreferredSuppliersDropdown from './components/PreferredSuppliersDropdown';
import EvaluationAssigneesSelect from './components/EvaluationAssigneesSelect';
import EvaluationAssignmentChairSelect from './components/EvaluationAssignmentChairSelect';
import ButtonSaveAssignment from './components/ButtonSaveAssignment';

import classNames from 'classnames';

class EvaluationAssignment extends Component {

    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.fetchEvaluationTemplates();
        apiActions.fetchAssigneesStaff();
        apiActions.fetchUser();
    }

    render() {
        let {
            evaluationTemplates,
            selectedTemplateId,
            evaluationTypeSelected,
            rfqTypeSelectedId,
            matchedSupplierId,
            selectedAssignmentEntityInstanceId,
            } = this.props;

        evaluationTemplates = evaluationTemplates.filter(item => item.active===1);
        const columnWidth = classNames('form-group', {
            'col-sm-4':(rfqTypeSelectedId !== '' && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1')),
            'col-sm-6':(rfqTypeSelectedId === '')
        });

        return (

            <div id="searcher-evaluation-assignment-container" className="db-form-section">

                <form>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label htmlFor="evaluationTemplate" className="control-label">Evaluation Template</label>
                            <EvaluationTemplatesDropdown evaluationTemplates={evaluationTemplates} />
                        </div>
                    </div>

                    <div className="row">
                        { selectedTemplateId !== '' ?

                            <div className={columnWidth}>
                                <label htmlFor="evaluationIsOn" className="control-label">Evaluation Type</label>
                                <EvaluationTypeDropdown />
                            </div>
                            : null
                        }

                        { evaluationTypeSelected === '2' || evaluationTypeSelected === '1' ?
                            <div className={columnWidth}>
                                <label htmlFor="evaluationLink" className="control-label">RFQ List</label>
                                <RfqListDropdown />
                            </div>
                            : null
                        }

                        { rfqTypeSelectedId !== '' && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ?
                            <div className={columnWidth}>
                                <label htmlFor="evaluationLink">Matched Suppliers</label>
                                <MatchedSuppliersDropdown />
                            </div>
                            : null
                        }
                    </div>

                    { matchedSupplierId !== '' && evaluationTypeSelected === '2' ?
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-2 text-center">
                                        <br />
                                        <br />
                                        <span>↳</span>
                                    </div>
                                    <div className="col-sm-10">
                                        <label htmlFor="evaluationLink">Matched Items</label>
                                        <MatchedItemsDropdown  />

                                    </div>
                                </div>
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
                                <label htmlFor="evaluationLink">Suppliers</label>
                                <PreferredSuppliersDropdown />
                            </div>
                        </div>
                        : null
                    }

                    { selectedAssignmentEntityInstanceId !== ''  ?
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                            <div className="col-sm-4 form-group">
                                <EvaluationAssignmentChairSelect />
                            </div>
                            <div className="col-sm-12" />
                            <div className="col-sm-4 form-group">
                                <EvaluationAssigneesSelect />
                            </div>
                        </div>
                        : null
                    }
                    <ButtonSaveAssignment />
                </form>
            </div>
        );
    }
}

EvaluationAssignment.propTypes = {
    evaluationTemplates: PropTypes.array.isRequired,
    selectedTemplateId: PropTypes.string.isRequired,
    evaluationTypeSelected: PropTypes.string.isRequired,
    rfqTypeSelectedId: PropTypes.string.isRequired,
    matchedSupplierId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    selectedAssignmentEntityInstanceId: PropTypes.string.isRequired,
    matchedSuppliersIsLoading: PropTypes.bool,
    actions: PropTypes.object,
    apiActions: PropTypes.object,
    columnWidth: PropTypes.string,
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
        isLoading,
        selectedTemplateId,
        selectedAssignmentEntityInstanceId,
        rfqTypeSelectedId,
        matchedSupplierId,
    } = state.evaluationAssignment;

    const evaluationTemplates = selectFromStore(state.evaluationAssignment, '/evaluation-templates', 'evaluationTemplates');

    return {
        ...ownProps,
        selectedTemplateId,
        evaluationTemplates,
        matchedSupplierId,
        evaluationTypeSelected,
        selectedAssignmentEntityInstanceId,
        rfqTypeSelectedId,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);
