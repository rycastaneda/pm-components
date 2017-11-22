import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { initialize, addTemplate, updateTemplate, fetchTemplate } from '../actions/evaluationTemplateCreator';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onTitleTextChange = this.onTitleTextChange.bind(this);
        this.state = { title:this.props.title, showAdd:false };
    }
    componentDidMount() {
        const element = document.querySelector('[data-component="searcher-evaluation-template-creator"]');
        const id = element.getAttribute('data-template-id');
        if (id) {
            this.props.dispatch(fetchTemplate(id));
        } else {
            this.props.dispatch(initialize());
        }

    }
    componentWillReceiveProps(nextProps) {
        window.console.log(nextProps);
        this.setState({ title:nextProps.title,  showAdd:false  });
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
        if (this.props.id) {
            this.props.dispatch(updateTemplate(this.state.title, this.props.id));
        }
    }
    render() {
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
                {
                    (id!==null)?
                        (allCriteriaIndexes.length)?
                            <div className="col-md-12">
                                <button className="btn btn-sm"
                                    onClick={() => this.setState({ showAdd: !this.state.showAdd })}>
                                    Add Criteria</button>
                                    {
                                        this.state.showAdd?
                                            <Criteria criteriaId={null}/>
                                            :null
                                        }
                            </div>
                            :
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
