import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AssignmentsFilter from '../components/AssignmentsFilter';
import { STATUS_LIST, LINKEDTO_LIST, MAXROWS_LIST } from '../constants/DataConstants';
import {
    onEvaluationAssignmentsDisplayedLengthChange,
    previewAssignment,
    editAssignment,
    changeAssignmentStatus,
    deleteAssignment,
    fetchEvaluationAssignmentsFor,
    initialize
} from '../actions/evaluationAssignments';

import AssignmentsTable from '../components/AssignmentsTable';

class EvaluationAssignmentList extends Component {
    constructor(props) {
        super(props);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(initialize());
    }
    onFilterSubmit(keyword, status, date) {
        fetchEvaluationAssignmentsFor(keyword, status, date);
    }
    tableRowLengthChanged(val) {
        onEvaluationAssignmentsDisplayedLengthChange(val);
    }

    onAssignmentPreviewClick(id) {
        previewAssignment(id);
    }

    onAssignmentEditClick(id) {
        editAssignment(id);
    }

    onAssignmentToggleActivateClick(id) {
        changeAssignmentStatus(id);
    }

    onAssignmentDeleteClick(id) {
        deleteAssignment(id);
    }

    render() {
        let { currentAssignmentList, pageCount } = this.props;
        return (
            <div className="searcher-evaluation-assignment-list">
                <AssignmentsFilter
                    assignmentStatusesList={STATUS_LIST}
                    assignmentLinkedToList={LINKEDTO_LIST}
                    onSubmit={this.onFilterSubmit}
                />
                <AssignmentsTable
                    tableData={currentAssignmentList}
                    rowCountList={MAXROWS_LIST}
                    pageCount={pageCount}
                    onAssignmentPreviewClick={this.onAssignmentPreviewClick.bind(this)}
                    onAssignmentEditClick={this.onAssignmentEditClick.bind(this)}
                    onAssignmentToggleActivateClick={this.onAssignmentToggleActivateClick.bind(this)}
                    onAssignmentDeleteClick={this.onAssignmentDeleteClick.bind(
                        this
                    )}
                    onMaxRowLengthChange={this.tableRowLengthChanged.bind(this)}
                />
            </div>
        );
    }
}

EvaluationAssignmentList.propTypes = {
    isBusy: PropTypes.bool.isRequired,
    currentAssignmentList: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isBusy,
        errorMessage,
        currentAssignmentList,
        pageCount
    } = state.evaluationAssignments;
    return { isBusy, errorMessage, currentAssignmentList, pageCount };
}
export default connect(mapStateToProps)(EvaluationAssignmentList);
