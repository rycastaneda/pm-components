import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { addTemplate, updateTemplate } from '../actions/evaluationTemplateCreator';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onTitleTextChange = this.onTitleTextChange.bind(this);
        this.state = { title:this.props.title };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ title:nextProps.title });
    }
    onSave() {
        if (this.props.id) {
            this.props.dispatch(updateTemplate(this.state.title, this.props.id));
        } else {
            this.props.dispatch(addTemplate(this.state.title));
        }
    }
    onTitleTextChange(event) {
        this.setState({ title:event.target.value });
    }
    render() {
        window.console.log(this.props);
        const { allCriteriaIndexes, id } = this.props;
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
                            onChange={this.onTitleTextChange}/>
                    </div>
                    <div className="form-group  pull-right">
                        {id===null?
                            <button className="btn btn-sm" disabled={!this.state.title} onClick={this.onSave}>Create Template</button>
                            :
                            (this.state.title&&(this.state.title!==this.props.title))?
                            <ul className="list-inline">
                                <li>
                                    <button className="btn btn-sm"
                                    onClick = {this.onSave}>Update</button>
                                </li>
                                <li>
                                    <button className="btn btn-sm"
                                    onClick = {() => this.setState({ title: this.props.title })}>Cancel</button>
                                </li>
                            </ul>
                            :null
                            }
                    </div>
                </div>
                {
                    allCriteriaIndexes.map((criteriaId, index) =>
                        <Criteria
                            key = {index}
                            criteriaId = {criteriaId}/>
                    )
                }
                { id!==null?
                <Criteria criteriaId={null}/>
                    :null
                }
            </div>
        </div>
    );
    }
}

EvaluationTemplateCreator.propTypes = {
    creatable:PropTypes.object,
    allCriteriaIndexes: PropTypes.array,
    title: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number
};

function mapStateToProps(state) {
    const { allCriteriaIndexes, title, id } = state.evaluationTemplateCreator;
    return { allCriteriaIndexes, title, id };
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);
