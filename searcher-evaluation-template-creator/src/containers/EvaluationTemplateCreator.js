import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from '../components/Criteria';
import { addCriteria, updateCriteria } from '../actions/evaluationTemplates';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
        this.state = { title:this.props.title };
        this.onCriteriaSave = this.onCriteriaSave.bind(this);
    }

    onCriteriaSave(id, title, weighting) {
        if (id) {
            this.props.dispatch(updateCriteria(id, title, weighting));
        } else {
            this.props.dispatch(addCriteria(title, weighting));
        }
    }

    render() {
        const { criteria } =this.props;
        return (
        <div className="searcher-evaluation-template-creator">
            <div className="db-form-section">
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label">
                            <span className="required" aria-required="true">Template Title*</span>
                        </label>
                        <input type="text"
                            name="title"
                            className="form-control"
                            value={this.state.title}
                            title="Template Title"
                            placeholder="Enter template title"
                            onChange={event => this.setState({ title:event.target.value })}/>
                        </div>
                    </div>
                    {criteria.map((criterion, index) =>
                        <Criteria
                            key = {index}
                            criteria = {criterion}
                            onSave={this.onCriteriaSave}  />
                    )}

            </div>
        </div>
    );
    }
}

EvaluationTemplateCreator.propTypes = {
    creatable:PropTypes.object,
    criteria: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { criteria, title } =state.evaluationTemplateCreator;
    return { criteria, title };
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);
