import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AssignmentsFilter from '../components/AssignmentsFilter';
import { MAXROWS_LIST } from '../constants/DataConstants';
import Notification from '../notification/Notification';
import {
    onEvaluationTemplatesDisplayedLengthChange,
    onEvaluationAssignmentFilterChange,
    onEvaluationTemplatesPageChange,
    onEvaluationAssignmentDelete,
    onMarkInProgress,
    onExportAsCSV,
    initialize
} from '../actions/evaluationAssignments';
import AssignmentsTable from '../components/AssignmentsTable';

class EvaluationAssignmentList extends Component {

    constructor(props) {
        super(props);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
        this.onAssignmentDelete = this.onAssignmentDelete.bind(this);
        this.onAssignmentMarkAsInProgress = this.onAssignmentMarkAsInProgress.bind(this);
        this.onExportButtonClick = this.onExportButtonClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(
            initialize()
        );
    }

    onFilterSubmit(result) {
        this.props.dispatch(
            onEvaluationAssignmentFilterChange(result)
        );
    }
    onAssignmentDelete(id) {
        this.props.dispatch(
            onEvaluationAssignmentDelete(id)
        );
    }
    onAssignmentMarkAsInProgress(id) {
        this.props.dispatch(
            onMarkInProgress(id)
        );
    }
    tableRowLengthChanged(val) {
        this.props.dispatch(
            onEvaluationTemplatesDisplayedLengthChange(val)
        );
    }

    paginateTo(page) {
        this.props.dispatch(
            onEvaluationTemplatesPageChange(page)
        );
    }
    onExportButtonClick() {
        this.props.dispatch(onExportAsCSV());
    }
    render() {
        return (
            <div className="searcher-evaluation-assignment-list">
                <Notification />
                <AssignmentsFilter
                    evaluationTemplateList = {this.props.evaluationTemplates}
                    assignmentStatusesList = {this.props.evaluationTemplateAssignmentStatuses}
                    assignedToList = {this.props.staff}
                    assignmentTypeList = {this.props.evaluationTemplateAssignmentTypes}
                    supplierList = {this.props.preferredSuppliers}
                    assignmentLinkedToList = {this.props.evaluationTemplates}
                    onSubmit = {this.onFilterSubmit}
                />
                <AssignmentsTable
                    onExportButtonClick = {this.onExportButtonClick}
                    isBusy = {this.props.isBusy}
                    tableData = {this.props.evaluationAssignments}
                    onAssignmentDelete = {this.onAssignmentDelete}
                    onAssignmentMarkAsInProgress = {this.onAssignmentMarkAsInProgress}
                    rowCountList = {MAXROWS_LIST}
                    currentPage = {this.props.currentPage}
                    totalPages = {this.props.totalPages}
                    rowCount = {this.props.maxRowLength}
                    onMaxRowLengthChange = {this.tableRowLengthChanged.bind(this)}
                    rowCountChange = {this.tableRowLengthChanged.bind(this)}
                    goToPage = {this.paginateTo.bind(this)}
                />
            </div>
        );
    }
}

EvaluationAssignmentList.propTypes = {
    isBusy: PropTypes.bool.isRequired,
    staff:PropTypes.array,
    preferredSuppliers:PropTypes.array,
    evaluationTemplateAssignmentTypes:PropTypes.array,
    evaluationTemplateAssignmentStatuses:PropTypes.array,
    evaluationAssignments: PropTypes.array.isRequired,
    evaluationTemplates:PropTypes.array,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    errorMessage: PropTypes.string,
    maxRowLength: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isBusy,
        evaluationTemplates,
        staff,
        preferredSuppliers,
        evaluationTemplateAssignmentTypes,
        evaluationTemplateAssignmentStatuses,
        currentPage,
        totalPages,
        maxRowLength,
        evaluationAssignments
    } = state.evaluationAssignments;
    return {
        isBusy,
        staff,
        preferredSuppliers,
        evaluationTemplateAssignmentTypes,
        evaluationTemplateAssignmentStatuses,
        evaluationTemplates,
        currentPage,
        totalPages,
        maxRowLength,
        evaluationAssignments
    };

}
export default connect(mapStateToProps)(EvaluationAssignmentList);
