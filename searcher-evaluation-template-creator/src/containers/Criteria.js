import React, { PropTypes, Component } from 'react';

import Question  from './Question';
import { connect } from 'react-redux';
import { addCriteria,
    updateCriteria,
    deleteCriteria } from '../actions/evaluationTemplateCreator';
import { createCriteria, createQuestion } from '../utils/dataParserUtil';
class Criteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMaximised: this.props.criteria.isMaximised,
            title:this.props.criteria.title,
            weight: this.props.criteria.weight,
            showAdd:false
        };
        this.newQuestion =createQuestion();
        this.onSave= this.onSave.bind(this);
        this.onCancel= this.onCancel.bind(this);
        this.onDelete= this.onDelete.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showAdd:false,
            title:nextProps.criteria.title,
            weight: nextProps.criteria.weight,
            isMaximised:nextProps.criteria.isMaximised });
    }
    onDelete() {
        this.props.dispatch(deleteCriteria(this.props.criteria.id));
    }
    onTitleChange(title) {
        this.setState({ title });
        if (this.props.criteria.id) {
            this.props.dispatch(updateCriteria(this.props.criteria.id, title, this.state.weight));
        }
    }
    onWeightChange(weight) {
        this.setState({ weight });
        if (this.props.criteria.id) {
            this.props.dispatch(updateCriteria(this.props.criteria.id, this.state.title, weight));
        }
    }
    onSave() {
        let title = this.state.title;
        let weight = this.state.weight;
        if (!this.props.criteria.id) {
            this.props.dispatch(addCriteria(title, weight));
        }
    }
    onCancel() {
        this.setState({ isMaximised: false });
    }
    render() {
        let { title, weight, isMaximised } =this.state;
        window.console.log(this.newQuestion);
        if (isMaximised) {
            return (
                <div>
                    <fieldset className="criteria-container">

                        <div className="row">

                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true">Criteria</span></label>
                                    <input type="text" name="title" className="form-control" value = {this.state.title} title="Criteria" placeholder="Criteria Title"
                                    onChange={event => this.onTitleChange(event.target.value)} />
                                </div>
                            </div>

                            <div className="col-md-2 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label"><span className="required" aria-required="true">Weighting</span></label>
                                    <input type="number" min="0" step="1" max="100" name="weight" value = {this.state.weight} className="form-control"  title="Criteria Weight" placeholder="Value"
                                    onChange={event => this.onWeightChange(event.target.value)} />
                                </div>
                            </div>

                            { this.props.criteria.id===null?
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
                                        <div className="col-md-2 col-sm-12">
                                            <div className="form-group pull-right">
                                                <div className="hidden-sm">
                                                    <br />
                                                    <br />
                                                </div>
                                                <button className="btn btn-sm"
                                                    onClick={this.onCancel}><i className="fa fa-window-minimize"></i>Minimize
                                                </button>
                                            </div>
                                        </div>
                                    :null
                                    }

                                </div>
                            }
                            </div>
                        <div>

                        {this.props.criteria.questions.length?
                            <div>
                                <div className="row">
                                { this.props.criteria.questions.map(item =>
                                    <div className="row" key={item}>
                                        <Question criteriaId={this.props.criteria.id} questionId={item}/>
                                    </div>
                                ) }
                                </div>
                                <div className="row">
                                    <div className="col-md-8 col-md-offset 1 mar-btm">
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
                                                    <Question criteriaId={this.props.criteria.id} question={this.newQuestion}/>
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
                                            <Question criteriaId={this.props.criteria.id} question={this.newQuestion}/>
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
                                <div>{weight}</div>
                            </div>
                        </div>
                        <div className="col-md-4 text-right">
                            <div className="form-group">
                                <br />
                                <button className="btn btn-sm"  onClick={() => this.setState({ isMaximised:!this.state.isMaximised })}><i className="fa fa-pencil"></i>Edit item</button>
                                &nbsp;
                                <button className="btn btn-sm" onClick={this.onDelete}><i className ="fa fa-trash-o"></i>Delete item</button>
                            </div>
                        </div>
                    </fieldset>
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
    window.console.log(state.evaluationTemplateCreator);
    let criteria = props.criteriaId ? criteriaByIndex[props.criteriaId]: createCriteria();

    return { criteria };
}
export default connect(mapStateToProps)(Criteria);
