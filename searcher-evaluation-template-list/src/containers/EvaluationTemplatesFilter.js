import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TemplatesFilter from '../components/TemplatesFilter';
import { STATUS_LIST } from '../constants/DataConstants';
import { fetchEvaluationTemplatesFor } from '../actions/evaluationTemplates';
class EvaluationTemplatesFilter extends Component {

    constructor(props) {
        super(props);

        this.onSubmit= this.onSubmit.bind(this);
    }
    onSubmit(keyword, status, date) {
        fetchEvaluationTemplatesFor(keyword, status, date);
    }
    render() {
        return (<TemplatesFilter
            templateStatusesList={['', ...STATUS_LIST]} 
            onSubmit={this.onSubmit}
        />);
    }
}

EvaluationTemplatesFilter.propTypes = {

    errorMessage:PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { statusList } = state.evaluationTemplates;
    return { statusList:['', ...statusList] };
}

export default connect(mapStateToProps)(EvaluationTemplatesFilter);
