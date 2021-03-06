import React, { PropTypes, Component } from 'react';

import Question  from './Question';
import { connect } from 'react-redux';
import {
    addCriteria,
    updateCriteria,
    deleteCriteria,
    toggleMaximiseCriteria,
    minimiseAllQuestions } from '../actions/evaluationTemplateCreator';
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
        this.onToggleNewQuestionClick= this.onToggleNewQuestionClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showAdd:false,
            title:nextProps.criteria.title,
            weight: nextProps.criteria.weight
        });
    }
    toggleMaximise() {
        if (this.intervalId) {
            this.updateCriteriaChange();
        }
        let { criteria } = this.props;
        this.props.dispatch(toggleMaximiseCriteria(criteria.id, !criteria.isMaximised));
        // this.setStateWithQuestion(question, false);
    }
    onToggleNewQuestionClick() {
        this.setState({ showAdd: !this.state.showAdd });
        this.props.dispatch(minimiseAllQuestions());
    }
    onDelete() {
        this.props.dispatch(deleteCriteria(this.props.criteria.id));
    }
    updateCriteriaChange() {
        let { title, weight } = this.state;
        if (title.length) {
            this.props.dispatch(updateCriteria(this.props.criteria.id, title, weight));
        }
        this.intervalId = clearInterval(this.intervalId);
    }

    onTitleChange(title) {
        this.setState({ title, isTitleError:!title.length });
        this.intervalId = clearInterval(this.intervalId);
        if (this.props.criteria.id&&title.length) {
            this.intervalId = setInterval(this.updateCriteriaChange, INPUT_SYNC_INTERVAL);
        }
    }

    onWeightChange(weight) {
        let isWeightError = false;
        if (weight.length) {
            if (!isNaN(weight)) {
                if (Number(weight>100)) {
                    isWeightError =true;
                } else if (Number(weight<1)) {
                    isWeightError =true;
                } else
                if (weight.indexOf('.')!==-1) {
                    isWeightError = true;
                }
            } else {
                isWeightError = true;
            }
        } else {
            weight = 0;
        }
        if (isWeightError) {
            this.setState({ isWeightError  });
        } else {
            this.setState({ weight, isWeightError  });
        }

        this.intervalId = clearInterval(this.intervalId);
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
    renderMaximised() {
        return (
            <div>
                <fieldset className="criteria-container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                                <label className="control-label">
                                    <span className="required" aria-required="true">Criteria
                                    </span>
                                </label>
                                <input
                                type="text"
                                name="title"
                                maxLength ="255"
                                className={this.getTitleInputStyle()}
                                defaultValue = {this.state.title}
                                title="Criteria"
                                placeholder="Criteria Title"
                                onChange={event => this.onTitleChange(event.target.value)} />
                                { this.state.isTitleError?
                                    <span className="error danger">Please add a Title</span>
                                    :null
                                }
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-12">
                            <div className="form-group">
                                <label className="control-label">
                                    <span className="required" aria-required="true">Weighting
                                        <i className="fa fa-info-circle"
                                            data-tooltip="The total weighting across all criteria must equal 100%."
                                            aria-hidden="true">
                                        </i>
                                    </span>
                                </label>
                                <div className="input-group">
                                  <input
                                  name="weight"
                                  defaultValue = {this.state.weight}
                                  className={this.getWeightInputStyle()}
                                  title="Criteria Weight"
                                  placeholder="Value"
                                  onChange={event => this.onWeightChange(event.target.value)}
                                  aria-describedby="weighting-addon"/>
                                  <span className="input-group-addon" id="weighting-addon">%</span>
                                </div>
                                { this.state.isWeightError?
                                  <span className="error danger">{"Accepted values: 1 to 100."}</span>
                                  :null
                                }
                            </div>
                        </div>

                        {this.props.criteria.id===null && this.state.title?
                            <div className="col-md-2 col-sm-12">
                                <div className="form-group pull-right">
                                    <div className="hidden-sm">
                                        <br/>
                                        <br/>
                                    </div>
                                    <button
                                    className="btn btn-sm"
                                    disabled={!this.state.title}
                                    onClick={this.onSave}>
                                        <i className="fa fa-plus"></i>Add Criteria
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                { (this.props.criteria.id!==null)&&(this.state.title || this.state.title!==this.props.criteria.title
                                    || this.state.weight!==this.props.criteria.weight)?
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group pull-right">
                                                <div className="hidden-sm">
                                                    <br/>
                                                    <br/>
                                                </div>
                                                <button className="btn btn-sm"
                                                    onClick={this.toggleMaximise}>
                                                    <i className="fa fa-angle-double-up"></i> Collapse Criteria
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
                        :null
                    }
                    <div>
                    {this.props.criteria.questions.length?
                        <div>
                            <div className="row">
                            { this.props.criteria.questions.map((item, index) =>
                                <div className="row" key={item}>
                                    <Question criteriaId={this.props.criteria.id}
                                    questionId={item}
                                    questionIndex={index+1} />
                                </div>
                            ) }
                            </div>
                            { !this.state.showAdd?
                                <div className="row">
                                    <div className="col-md-12 new-question mar-btm">
                                        <button className="btn btn-sm"
                                            onClick={this.onToggleNewQuestionClick}>
                                            <i className="fa fa-plus"></i>Add New Question
                                        </button>
                                    </div>
                                </div>
                                :null
                            }
                            <div className="row">
                                <div className="row">
                                    {this.state.showAdd?
                                            <Question criteriaId={this.props.criteria.id}
                                            question={this.newQuestion}
                                            onNewQuestionClose = {this.onToggleNewQuestionClick}
                                            questionIndex={this.props.criteria.questions.length+1} />
                                        :null
                                    }
                                </div>
                            </div>
                        </div>
                        :<div>
                            {this.props.criteria.id?
                                <div className="row">
                                    <div className="row">
                                        <Question criteriaId={this.props.criteria.id}
                                        question={this.newQuestion}
                                        questionIndex ={this.props.criteria.questions.length+1}  />
                                    </div>
                                </div>
                                :null
                            }
                            {
                                this.props.onNewCriteriaClose?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group pull-right">
                                            <button className="btn"
                                            onClick={this.props.onNewCriteriaClose}>
                                            <i className="fa fa-times"></i>Discard Criteria</button>
                                        </div>
                                    </div>
                                </div>:null

                            }
                        </div>
                    }
                    </div>
                </fieldset>
            </div>
        );
    }
    renderMinimised() {
        let { title, weight }=this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <fieldset className="criteria-container collapsed">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">
                                    <span className="required" aria-required="true" required>Criteria</span>
                                </label>
                                <div>{title}</div>
                            </div>
                        </div>
                        <div className="col-md-2 text-center">
                            <div className="form-group">
                                <label className="control-label">
                                    <span className="required" aria-required="true">Weighting</span>
                                </label>
                                <div>{weight} %</div>
                            </div>
                        </div>
                        <div className="col-md-4 text-right">
                            <div className="form-group">
                                <br />
                                <button
                                className="btn btn-sm"
                                onClick={this.toggleMaximise}>
                                    <i className="fa fa-pencil"></i>Edit Criteria
                                </button>
                                &nbsp;
                                <button
                                className="btn btn-sm" onClick={this.onDelete}>
                                    <i className ="fa fa-trash-o"></i>Delete Criteria
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
    render() {
        return this.props.criteria.isMaximised? this.renderMaximised(): this.renderMinimised();
    }
}

Criteria.propTypes = {
    criteriaId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    onNewCriteriaClose: PropTypes.func,
    criteriaByIndex:PropTypes.array,
    criteria: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    const { criteriaByIndex } = state.evaluationTemplateCreator;
    let criteria = props.criteriaId ? criteriaByIndex[props.criteriaId]: createCriteria();

    return { criteria };
}
export default connect(mapStateToProps)(Criteria);
