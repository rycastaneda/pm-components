import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { addCriteria, updateCriteria, addTemplate, updateTemplate } from '../actions/evaluationTemplateCreator';
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
    onSave() {
        if (this.props.id) {
            this.props.dispatch(updateTemplate(this.state.title, this.props.id));
        } else {
            this.props.dispatch(addTemplate(this.state.title));

        }
    }
    render() {
        const { criteria, id } =this.props;
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
                        <div className="form-group">
                            {id===null?
                                <button className="btn btn-sm" onClick={() => this.onSave(this.state.title)}>Create Template</button>
                                :
                                    <button className="btn btn-sm" onClick={() => this.onSave(this.state.title)}>Save Template</button>
                                }
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
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number
};

function mapStateToProps(state) {
    const { criteria, title, id } =state.evaluationTemplateCreator;

    return { criteria, title, id };
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);
