import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const ButtonSaveAssignment = ({ selectedAssignees, selectedAssignmentEntityInstanceId, currentUser, actions }) => (
    <div>
        { (selectedAssignmentEntityInstanceId === '' || selectedAssignees.length === 0) && currentUser.role !== 'Standard User' ?
            <div className="row">
                <div className="col-sm-4">
                    <button title="Save" disabled className="btn btn-md disabled" type="button">Save</button>
                </div>
            </div>
            :
            <div className="row">
                <div className="col-sm-4">
                    <button title="Save" className="btn btn-md " type="button" onClick={actions.createAssignment}>Save</button>
                </div>
            </div>
        }
    </div>
);

ButtonSaveAssignment.propTypes = {
    actions: PropTypes.object,
    selectedAssignmentEntityInstanceId: PropTypes.string.isRequired,
    selectedAssignees:PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { selectedAssignees, selectedAssignmentEntityInstanceId, currentUser } = state.evaluationAssignment;

    return {
        ...ownProps,
        selectedAssignees,
        selectedAssignmentEntityInstanceId,
        currentUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSaveAssignment);
