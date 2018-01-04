import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  Select  from 'react-select';

import { selectFromStore } from '../../utils/selectFromStore';
import { concatLabelKey } from '../../utils/concatLabelKey';

import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationAssigneesSelect = ({ evaluationAssignees, actions, selectedAssignees, currentUser }) => (
    <div>
        { currentUser.role === 'Standard User' ?
            <div>
                <select className="form-control" disabled>
                    <option>{`${currentUser.firstName} ${currentUser.lastName}`}</option>
                </select>
            </div>
            :
            <div>
                <label htmlFor="assignees">Evaluation Assignees</label>
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
            </div>

        }
    </div>
);

EvaluationAssigneesSelect.propTypes = {
    actions: PropTypes.object,
    evaluationAssignees: PropTypes.array.isRequired,
    selectedAssignees: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { selectedAssignees, currentUser } = state.evaluationAssignment;
    const evaluationAssignees = concatLabelKey(selectFromStore(state.evaluationAssignment, '/staff', 'staff'));

    return {
        ...ownProps,
        selectedAssignees,
        evaluationAssignees,
        currentUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationAssigneesSelect);
