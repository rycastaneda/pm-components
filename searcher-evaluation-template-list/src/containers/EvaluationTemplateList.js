import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EvaluationTemplatesFilter from '../containers/EvaluationTemplatesFilter';
import { onEvaluationTemplatesDisplayedLengthChange, previewTemplate, editTemplate, changeTemplateStatus, deleteTemplate } from '../actions/evaluationTemplates';
import TemplatesTable from '../components/TemplatesTable';
class EvaluationTemplateList extends Component {

    constructor(props) {
        super(props);
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
        let { currentTemplateList, rowCountList, pageCount }= this.props;
        return (
        <div className="searcher-evaluation-template-list">
            <EvaluationTemplatesFilter />
            <TemplatesTable tableData= {currentTemplateList}
            rowCountList= {rowCountList}
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
    rowCountList: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    errorMessage:PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { isBusy, errorMessage, currentTemplateList, rowCountList, pageCount } = state.evaluationTemplates;
    return { isBusy, errorMessage, currentTemplateList, rowCountList, pageCount };
}
export default connect(mapStateToProps)(EvaluationTemplateList);
