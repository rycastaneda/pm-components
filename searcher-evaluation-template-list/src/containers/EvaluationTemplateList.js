import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TemplatesFilter from '../components/TemplatesFilter';
import { STATUS_LIST, MAXROWS_LIST } from '../constants/DataConstants';
import { onEvaluationTemplatesDisplayedLengthChange, previewTemplate, editTemplate, changeTemplateStatus, deleteTemplate, fetchEvaluationTemplatesFor, fetchEvaluationTemplates } from '../actions/evaluationTemplates';
import TemplatesTable from '../components/TemplatesTable';
class EvaluationTemplateList extends Component {

    constructor(props) {
        super(props);
        this.onFilterSubmit= this.onFilterSubmit.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchEvaluationTemplates());
    }
    onFilterSubmit(keyword, status, date) {
        fetchEvaluationTemplatesFor(keyword, status, date);
    }
    tableRowLengthChanged(val) {
        onEvaluationTemplatesDisplayedLengthChange(val);
    }

    onTemplatePreviewClick(id) {
        previewTemplate(id);
    }

    onTemplateEditClick(id) {
        editTemplate(id);
    }

    onTemplateToggleActivateClick(id) {
        changeTemplateStatus(id);
    }

    onTemplateDeleteClick(id) {
        deleteTemplate(id);
    }

    render() {
        let { currentTemplateList, pageCount }= this.props;
        return (
        <div className="searcher-evaluation-template-list">
            <TemplatesFilter
                templateStatusesList={[STATUS_LIST]}
                onSubmit={this.onFilterSubmit}
            />
            <TemplatesTable tableData= {currentTemplateList}
                rowCountList= {MAXROWS_LIST}
                pageCount= {pageCount}
                onTemplatePreviewClick= {this.onTemplatePreviewClick.bind(this)}
                onTemplateEditClick= {this.onTemplateEditClick.bind(this)}
                onTemplateToggleActivateClick= {this.onTemplateToggleActivateClick.bind(this)}
                onTemplateDeleteClick= {this.onTemplateDeleteClick.bind(this)}
                onMaxRowLengthChange= {this.tableRowLengthChanged.bind(this)}/>
        </div>);
    }
}

EvaluationTemplateList.propTypes = {
    isBusy:PropTypes.bool.isRequired,
    currentTemplateList: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    errorMessage:PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { isBusy, errorMessage, currentTemplateList, pageCount } = state.evaluationTemplates;
    return { isBusy, errorMessage, currentTemplateList, pageCount };
}
export default connect(mapStateToProps)(EvaluationTemplateList);
