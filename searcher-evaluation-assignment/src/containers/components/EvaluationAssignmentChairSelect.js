import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore } from '../../utils/selectFromStore';
import { concatLabelKey } from '../../utils/concatLabelKey';
import  Select  from 'react-select';

import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationAssignmentChairSelect = ({ evaluationAssignees, actions, selectedAssigneeChairman, currentUserRole, userStaff }) => (
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
                    onChange={actions.updateSelectedAssigneeChairman}
                    options={evaluationAssignees}
                    placeholder="Select Assignment Chair"
                    removeSelected={true}
                    value={selectedAssigneeChairman}
                />
            </div>
        }
    </div>
);

EvaluationAssignmentChairSelect.propTypes = {
    actions: PropTypes.object,
    evaluationAssignees: PropTypes.array.isRequired,
    currentUserRole: PropTypes.string.isRequired,
    selectedAssigneeChairman: PropTypes.object,
    userStaff: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { currentUserRole, selectedAssigneeChairman } = state.evaluationAssignment;
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));
    const userStaff = selectFromStore(state.evaluationAssignment, '/user', 'users')[0].staff;
    return {
        ...ownProps,
        evaluationAssignees,
        selectedAssigneeChairman,
        currentUserRole,
        userStaff,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssignmentChairSelect);
