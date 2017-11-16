import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TemplatesFilter from '../components/TemplatesFilter';
import { STATUS_LIST, MAXROWS_LIST } from '../constants/DataConstants';
import {
    onEvaluationTemplatesDisplayedLengthChange,
    previewTemplate,
    editTemplate,
    changeTemplateStatus,
    onEvaluationTemplatesFilterChange,
    onEvaluationTemplatesPageChange,
    fetchEvaluationTemplates
} from '../actions/evaluationTemplates';
import TemplatesTable from '../components/TemplatesTable';
class EvaluationTemplateList extends Component {
    constructor(props) {
        super(props);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchEvaluationTemplates());
    }


    onFilterSubmit(keyword, status, date) {
        this.props.dispatch(
            onEvaluationTemplatesFilterChange(keyword, status, date)
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
            maxRowLength
        } = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <TemplatesFilter
                    templateStatusesList={STATUS_LIST}
                    onSubmit={this.onFilterSubmit}
                />
                <TemplatesTable
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
        currentTemplateList,
        currentPage,
        totalPages,
        maxRowLength
    } = state.evaluationTemplates;
    return {
        isBusy,
        errorMessage,
        currentTemplateList,
        currentPage,
        totalPages,
        maxRowLength
    };
}
export default connect(mapStateToProps)(EvaluationTemplateList);
