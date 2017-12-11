import React, { PropTypes, Component } from 'react';

import Question  from './Question';
import { connect } from 'react-redux';
import { addCriteria,
    updateCriteria,
    deleteCriteria,
toggleMaximiseCriteria } from '../actions/evaluationTemplateCreator';
import { createCriteria, createQuestion } from '../utils/dataParserUtil';

import { INPUT_SYNC_INTERVAL } from '../constants';
class Criteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.criteria.title,
            weight: this.props.criteria.weight,
            showAdd:false,
            isSaved:false,
            isTitleError:false,
            isWeightError:false
        };
        this.newQuestion = createQuestion();
        this.onSave = this.onSave.bind(this);
        this.updateCriteriaChange = this.updateCriteriaChange.bind(this);
        this.toggleMaximise = this.toggleMaximise.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showAdd:false,
            title:nextProps.criteria.title,
            weight: nextProps.criteria.weight
        });
    }
    toggleMaximise() {
        clearInterval(this.intervalId_update);
        clearInterval(this.intervalId_saveAnim);
        let { criteria } = this.props;
        this.props.dispatch(toggleMaximiseCriteria(criteria.id, !criteria.isMaximised));
        // this.setStateWithQuestion(question, false);
    }
    onDelete() {
        this.props.dispatch(deleteCriteria(this.props.criteria.id));
    }
    updateCriteriaChange() {
        let { title, weight } = this.state;
        if (title.length&&weight.length) {
            this.props.dispatch(updateCriteria(this.props.criteriaId, this.state.title, this.state.weight));
        }

        clearInterval(this.intervalId);
    }

    onTitleChange(title) {
        this.setState({ title, isTitleError:!title.length });
        clearInterval(this.intervalId);
        if (this.props.criteria.id&&title.length) {

            this.intervalId = setInterval(this.updateCriteriaChange, INPUT_SYNC_INTERVAL);
        }
    }

    onWeightChange(weight) {
        let isWeightError = false;
        if (weight.length) {
            if (Number(weight>100)) {
                isWeightError =true;
            }
            if (Number(weight<0)) {
                isWeightError =true;
            }
        } else {
            isWeightError = true;
        }
        this.setState({ weight, isWeightError  });
        clearInterval(this.intervalId);
        if (this.props.criteria.id&&!isWeightError) {
            this.intervalId = setInterval(this.updateCriteriaChange, INPUT_SYNC_INTERVAL);
        }
    }

    getWeightInputStyle() {
        let style = 'form-control';
        if (this.state.isWeightError) {
            style +=' error';
        } else if (this.state.isSaved) {
            style +=' saved';
        }
        return style;
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
    onSave() {
        let title = this.state.title;
        let weight = this.state.weight;
        if (!this.props.criteria.id) {
            this.props.dispatch(addCriteria(title, weight));
        }
    }

    getQuestionIndex(index) {
        return index + 1;
    }

    render() {
        let { title, weight } =this.state;
        if (this.props.criteria.isMaximised) {
            return (
                <div>
                    <fieldset className="criteria-container">

                        <div className="row">

                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true">Criteria</span></label>
                                    <input type="text" name="title" className={this.getTitleInputStyle()} defaultValue = {this.state.title} title="Criteria" placeholder="Criteria Title"
                                    onChange={event => this.onTitleChange(event.target.value)} />
                                    { this.state.isTitleError?<span className="error danger">Please add a Title</span>:null}
                                </div>
                            </div>

                            <div className="col-md-2 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true">Weighting
                                    <i className="fa fa-info-circle" data-tooltip="The total weighting across all criteria must equal 100%." aria-hidden="true"></i></span></label>
                                    <div className="input-group">
                                      <input type="number" min="0" step="1"  name="weight" defaultValue = {this.state.weight} className={this.getWeightInputStyle()} title="Criteria Weight" placeholder="Value"
                                      onChange={event => this.onWeightChange(event.target.value)} aria-describedby="weighting-addon"/>
                                      <span className="input-group-addon" id="weighting-addon">%</span>
                                  </div>
                                  { this.state.isWeightError?<span className="error danger">Accepted values: 0 to 100</span>:null}
                                </div>
                            </div>

                            { this.props.criteria.id===null && this.state.title?
                                <div className="col-md-2 col-sm-12">
                                    <div className="form-group pull-right">
                                        <div className="hidden-sm">
                                            <br />
                                            <br />
                                        </div>
                                        <button className="btn btn-sm" disabled={!this.state.title} onClick={this.onSave}><i className="fa fa-plus"></i>Add Criteria</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    { (this.state.title || this.state.title!==this.props.criteria.title
                                        || this.state.weight!==this.props.criteria.weight)?
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group pull-right">
                                                <div className="hidden-sm">
                                                    <br />
                                                    <br />
                                                </div>
                                                <button className="btn btn-sm"
                                                    onClick={this.toggleMaximise}><i className="fa fa-angle-double-up"></i> Collapse Criteria
                                                </button>
                                            </div>
                                        </div>
                                    :null
                                    }

                                </div>
                            }
                            </div>
                            {this.props.criteria.questions.length?
                            <div className="row">
                                <div className="col-md-12">
                                    <hr />
                                </div>
                            </div>
                            :null}
                        <div>

                        {this.props.criteria.questions.length?
                            <div>
                                <div className="row">
                                { this.props.criteria.questions.map((item, index) =>
                                    <div className="row" key={item}>
                                        <Question criteriaId={this.props.criteria.id} questionId={item} questionIndex={index+1} />
                                    </div>
                                ) }
                                </div>
                                <div className="row">
                                    <div className="col-md-12 new-question mar-btm">
                                        <button className="btn btn-sm"
                                            onClick={() => this.setState({ showAdd: !this.state.showAdd })}>
                                            <i className="fa fa-plus"></i>Add New Question
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="row">
                                            {
                                                this.state.showAdd?
                                                    <Question criteriaId={this.props.criteria.id} question={this.newQuestion} questionIndex ={this.props.criteria.questions.length+1} />
                                                    :null
                                                }
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {
                                    this.props.criteria.id?
                                    <div className="row">
                                        <div className="row">
                                            <Question criteriaId={this.props.criteria.id} question={this.newQuestion} questionIndex ={this.props.criteria.questions.length+1}  />
                                        </div>
                                    </div>
                                    :null
                                }
                            </div>
                        }
                        </div>
                    </fieldset>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <fieldset className="criteria-container collapsed">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true" required>Criteria</span></label>
                                    <div>{title}</div>
                                </div>
                            </div>
                            <div className="col-md-2 text-center">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true">Weighting</span></label>
                                    <div>{weight} %</div>
                                </div>
                            </div>
                            <div className="col-md-4 text-right">
                                <div className="form-group">
                                    <br />
                                <button className="btn btn-sm"  onClick={this.toggleMaximise}><i className="fa fa-pencil"></i>Edit Criteria</button>
                                    &nbsp;
                                    <button className="btn btn-sm" onClick={this.onDelete}><i className ="fa fa-trash-o"></i>Delete Criteria</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            );
        }
    }
}

Criteria.propTypes = {
    criteriaId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    criteriaByIndex:PropTypes.array,
    criteria: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    const { criteriaByIndex } = state.evaluationTemplateCreator;
    let criteria = props.criteriaId ? criteriaByIndex[props.criteriaId]: createCriteria();
    return { criteria };
}
export default connect(mapStateToProps)(Criteria);
