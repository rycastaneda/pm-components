import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AssignmentsFilter from '../components/AssignmentsFilter';
import { MAXROWS_LIST } from '../constants/DataConstants';
import {
    onEvaluationTemplatesDisplayedLengthChange,

    onEvaluationAssignmentFilterChange,
    onEvaluationTemplatesPageChange,
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


    onFilterSubmit(result) {
        this.props.dispatch(
            onEvaluationAssignmentFilterChange(result)
        );
    }

    tableRowLengthChanged(val) {
        this.props.dispatch(onEvaluationTemplatesDisplayedLengthChange(val));
    }
    paginateTo(page) {
        this.props.dispatch(onEvaluationTemplatesPageChange(page));
    }

    render() {
        let {
            currentPage,
            totalPages,
            maxRowLength
        } = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <AssignmentsFilter
                    evaluationTemplateList = {this.props.evaluationTemplates}
                    assignmentStatusesList = {this.props.evaluationTemplateAssignmentStatuses}
                    assignedToList = {this.props.staff}
                    assignmentTypeList = {this.props.evaluationTemplateAssignmentTypes}
                    supplierList = {this.props.preferredSuppliers}
                    assignmentLinkedToList = {this.props.evaluationTemplates}
                    onSubmit={this.onFilterSubmit}
                />
                <AssignmentsTable
                    tableData= {this.props.evaluationAssignments}
                    rowCountList= {MAXROWS_LIST}
                    currentPage= {currentPage}
                    totalPages= {totalPages}
                    rowCount= {maxRowLength}
                    onMaxRowLengthChange={this.tableRowLengthChanged.bind(this)}
                    rowCountChange={this.tableRowLengthChanged.bind(this)}
                    goToPage={this.paginateTo.bind(this)}
                />
            </div>
        );
    }
}

EvaluationAssignmentList.propTypes = {
    isBusy: PropTypes.bool.isRequired,
    filterStatusList:PropTypes.array.isRequired,
    staff:PropTypes.array,
    preferredSuppliers:PropTypes.array,
    evaluationTemplateAssignmentTypes:PropTypes.array,
    evaluationTemplateAssignmentStatuses:PropTypes.array,
    evaluationAssignments: PropTypes.array.isRequired,
    evaluationTemplates:PropTypes.array,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    errorMessage: PropTypes.string,
    maxRowLength: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isBusy,
        errorMessage,
        evaluationTemplates,
        staff,
        preferredSuppliers,
        evaluationTemplateAssignmentTypes,
        evaluationTemplateAssignmentStatuses,
        filterStatusList,
        currentPage,
        totalPages,
        maxRowLength,
        evaluationAssignments
    } = state.evaluationAssignments;

    return {
        isBusy,
        errorMessage,
        staff,
        preferredSuppliers,
        evaluationTemplateAssignmentTypes,
        evaluationTemplateAssignmentStatuses,
        evaluationTemplates,
        filterStatusList,
        currentPage,
        totalPages,
        maxRowLength,
        evaluationAssignments
    };
}
export default connect(mapStateToProps)(EvaluationAssignmentList);
