import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Select  from 'react-select';

import { selectFromStore } from '../../utils/selectFromStore';
import { concatLabelKey } from '../../utils/concatLabelKey';

import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationAssigneesSelect = ({ evaluationAssignees, actions, selectedAssignees, currentUserRole, userStaff }) => (
    <div>
        { currentUserRole === 'Standard User' ?
            <div>
                <select className="form-control" disabled>
                    <option>{`${userStaff.firstName} ${userStaff.lastName}`}</option>
                </select>
            </div>
            :
            <div className="input-group">
                <Select
                    className="pm-react-select"
                    labelKey="fullName"
                    closeOnSelect={true}
                    multi
                    backspaceToRemoveMessage={""}
                    onChange={actions.updateSelectedAssignees}
                    options={evaluationAssignees}
                    placeholder="Select Assignees"
                    removeSelected={true}
                    value={selectedAssignees}
                />
            </div>
        }
    </div>
);

EvaluationAssigneesSelect.propTypes = {
    actions: PropTypes.object,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees: PropTypes.array.isRequired,
    currentUserRole: PropTypes.string.isRequired,
    userStaff: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { selectedAssignees, currentUserRole } = state.evaluationAssignment;
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));
    const userStaff = selectFromStore(state.evaluationAssignment, '/user', 'users')[0].staff;

    return {
        ...ownProps,
        selectedAssignees,
        evaluationAssignees,
        currentUserRole,
        userStaff,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssigneesSelect);
