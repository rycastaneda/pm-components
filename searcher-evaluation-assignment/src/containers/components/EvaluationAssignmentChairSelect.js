import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore } from '../../utils/selectFromStore';
import { concatLabelKey } from '../../utils/concatLabelKey';
import  Select  from 'react-select';

import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationAssignmentChairSelect = ({ evaluationAssignees, actions, selectedAssigneeChairman, currentUser }) => (
    <div>
        { currentUser.role === 'Standard User' ?
            null
            :
            <div className="input-group">
                <label htmlFor="assignees">Evaluation Assignment Chair</label>
                <div>
                    <Select
                        className="pm-react-select"
                        labelKey="fullName"
                        closeOnSelect={true}
                        onChange={actions.updateSelectedAssigneeChairman}
                        options={evaluationAssignees}
                        placeholder="Select Assignment Chair"
                        removeSelected={true}
                        value={selectedAssigneeChairman}
                    />
                </div>

            </div>
        }
    </div>
);

EvaluationAssignmentChairSelect.propTypes = {
    actions: PropTypes.object,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssigneeChairman: PropTypes.object,
    currentUser: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { currentUser, selectedAssigneeChairman } = state.evaluationAssignment;
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));

    return {
        ...ownProps,
        evaluationAssignees,
        selectedAssigneeChairman,
        currentUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignmentChairSelect);
