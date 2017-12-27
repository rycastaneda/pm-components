import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from './Criteria';
import { initialize,
    addTemplate,
    updateTemplate,
    fetchTemplate,
    publishTemplate,
    minimiseAllCriteria } from '../actions/evaluationTemplateCreator';
import Notification from '../notification/Notification';
import Modal from '../modal/Modal';
import { INPUT_SYNC_INTERVAL } from '../constants';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onTitleTextChange = this.onTitleTextChange.bind(this);
        this.updateTitleText= this.updateTitleText.bind(this);
        this.getTitleInputStyle = this.getTitleInputStyle.bind(this);
        this.state = { title:this.props.title, showAdd:false, isTitleError:false, isSaved:false };
        this.intervalId_update = null;
        this.intervalId_saveAnim =null;
    }

    componentDidMount() {
        const element = document.querySelector('[data-component="searcher-evaluation-template-creator"]');
        const id = Number(element.getAttribute('data-template-id'));

        if (id) {
            this.props.dispatch(fetchTemplate(id));
        } else {
            this.props.dispatch(initialize());
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId_update);
        clearInterval(this.intervalId_saveAnim);
    }

    componentWillReceiveProps(nextProps) {
        this.templateTitleField.value = nextProps.title;
        this.setState({ title:nextProps.title, showAdd:false, isSaved:true, isTitleError:false });
    }

    onSave() {
        if (this.props.id) {
            this.props.dispatch(updateTemplate(this.state.title, this.props.id));
        } else {
            this.props.dispatch(addTemplate(this.state.title));
        }
    }

    updateTitleText() {
        this.props.dispatch(updateTemplate(this.state.title, this.props.id));
        clearInterval(this.intervalId_update);

    }

    onTitleTextChange(event) {
        clearInterval(this.intervalId_update);
        this.setState({ title:event.target.value, isTitleError:!event.target.value.length  });
        if (this.props.id&&event.target.value) {
            this.intervalId_update = setInterval(this.updateTitleText, INPUT_SYNC_INTERVAL);
        }
    }

    getTitleInputStyle() {
        let style = 'form-control';
        if (this.state.isTitleError) {
            style +=' error';
        } else if (this.state.isSaved) {
            style +=' saved';
        }
        return style;
    }

    render() {
        const { allCriteriaIndexes, id } = this.props;
        return (
        <div className="searcher-evaluation-template-creator">
            <Notification />
            <Modal />
            <div className="db-form-section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="template-title-container">
                            <div className="form-group">
                                <label className="control-label">
                                    <span className="required" aria-required="true">Template Title</span>
                                </label>
                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <input type="text"
                                            name="title"
                                            ref = {(input) => {
                                                this.templateTitleField = input;
                                            } }
                                            className={this.getTitleInputStyle()}
                                            defaultValue = {this.state.title}
                                            title="Template Title"
                                            placeholder="Enter template title"
                                            onChange={this.onTitleTextChange}
                                        />
                                        { this.state.isTitleError?<span className="error danger">Title cannot be empty</span>:null}
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <div className="form-group">
                                            {id===null?
                                                <button className="btn btn-sm" disabled={!this.state.title} onClick={this.onSave}><i className="fa fa-plus"></i>Create Template</button>
                                                :null
                                                }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    allCriteriaIndexes.map((criteriaId, index) =>
                    <div className="row" key = {index}>
                        <Criteria
                            criteriaId = {criteriaId}/>
                    </div>
                    )
                }
                {
                    (id!==null)?
                        (allCriteriaIndexes.length)?
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group new-criteria">
                                            <button className="btn"
                                            onClick={() => {
                                                this.setState({ showAdd: !this.state.showAdd });
                                                this.props.dispatch(minimiseAllCriteria());
                                            }}>
                                            <i className="fa fa-plus"></i>Add New Criteria</button>
                                        </div>
                                    </div>
                                </div>
                                    {
                                        this.state.showAdd?
                                            <div className="row"><Criteria criteriaId={null}/></div>
                                            :null
                                        }

                            </div>
                            :
                            <div className="row">
                                <Criteria criteriaId={null}/>
                            </div>
                        :null
                }
                <div className="row">
                    <div className={`col-md-12 text-right ${id !== null ? 'show' : 'hidden'}`}>
                        <hr />
                        <div className="form-group">
                            <ul className="list-inline">
                                <li>
                                    <a className="btn btn-md" href="/searcher/evaluation_templates/list"><i className="fa fa-save"></i>Save and Continue Later</a>
                                </li>
                                <li>
                                    <button className="btn btn-md save-template " type="button" onClick={() => this.props.dispatch(publishTemplate())}><i className="fa fa-send"></i>Publish Template</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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
