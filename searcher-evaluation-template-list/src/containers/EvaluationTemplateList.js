import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TemplatesFilter from '../components/TemplatesFilter';
import Notification from '../notification/Notification';
import { STATUS_LIST, MAXROWS_LIST } from '../constants/DataConstants';
import {
    onEvaluationTemplatesDisplayedLengthChange,
    previewTemplate,
    editTemplate,
    changeTemplateStatus,
    onEvaluationTemplatesFilterChange,
    onEvaluationTemplatesPageChange,
    initialize
} from '../actions/evaluationTemplates';
import TemplatesTable from '../components/TemplatesTable';

class EvaluationTemplateList extends Component {

    constructor(props) {
        super(props);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(initialize());
    }

    onFilterSubmit(keyword, status, date, userId) {
        this.props.dispatch(
            onEvaluationTemplatesFilterChange(keyword, status, date, userId)
        );
    }

    tableRowLengthChanged(val) {
        this.props.dispatch(onEvaluationTemplatesDisplayedLengthChange(val));
    }
    paginateTo(page) {

        this.props.dispatch(onEvaluationTemplatesPageChange(page));
    }
    onTemplatePreviewClick(id) {
        previewTemplate(id);
    }

    onTemplateEditClick(id) {
        editTemplate(id);
    }

    onTemplateToggleActivateClick(id, status) {
        this.props.dispatch(changeTemplateStatus(id, status));
    }

    render() {
        let {
            currentTemplateList,
            currentPage,
            totalPages,
            maxRowLength,
            users
        } = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <Notification />
                <TemplatesFilter
                    templateStatusesList={STATUS_LIST}
                    users = {users}
                    onSubmit={this.onFilterSubmit}
                />
                <TemplatesTable
                    isBusy ={this.props.isBusy}
                    tableData= {currentTemplateList}
                    rowCountList= {MAXROWS_LIST}
                    currentPage= {currentPage}
                    totalPages= {totalPages}
                    rowCount= {maxRowLength}
                    onTemplatePreview= {this.onTemplatePreviewClick.bind(
                        this
                    )}
                    onTemplateEdit= {this.onTemplateEditClick.bind(this)}
                    onTemplateToggleActivation= {this.onTemplateToggleActivateClick.bind(
                        this
                    )}
                    onMaxRowLengthChange={this.tableRowLengthChanged.bind(this)}
                    rowCountChange={this.tableRowLengthChanged.bind(this)}
                    goToPage={this.paginateTo.bind(this)}
                />
            </div>
        );
    }
}

EvaluationTemplateList.propTypes = {
    isBusy: PropTypes.bool.isRequired,
    currentTemplateList: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    errorMessage: PropTypes.string,
    maxRowLength: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isBusy,
        users,
        errorMessage,
        currentTemplateList,
        currentPage,
        totalPages,
        maxRowLength
    } = state.evaluationTemplates;
    return {
        isBusy,
        users,
        errorMessage,
        currentTemplateList,
        currentPage,
        totalPages,
        maxRowLength
    };
}
export default connect(mapStateToProps)(EvaluationTemplateList);
