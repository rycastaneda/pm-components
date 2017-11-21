import React, { PropTypes, Component } from 'react';

import Question  from './Question';
import { connect } from 'react-redux';
import { addCriteria,
    updateCriteria,
    deleteCriteria } from '../actions/evaluationTemplateCreator';
import { createCriteria } from '../utils/dataParserUtil';
class Criteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMaximised: this.props.criteria.isMaximised,
            title:this.props.criteria.title,
            weight: this.props.criteria.weight,
            isShowAdd:false
        };
        this.onSave= this.onSave.bind(this);
        this.onCancel= this.onCancel.bind(this);
        this.onDelete= this.onDelete.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ title:nextProps.criteria.title,
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

        if (isMaximised) {
            return (
                <div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                            <input type="text" name="title" className="form-control" value = {this.state.title} title="Criteria" placeholder="Criteria title"
                            onChange={event => this.onTitleChange(event.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">weight*</span></label>
                            <input type="number" min="0" step="1" max="100" name="weight" value = {this.state.weight} className="form-control"  title="Criteria weight" placeholder="Enter weight value"
                            onChange={event => this.onWeightChange(event.target.value)} />
                        </div>
                    </div>
                    { this.props.criteria.id===null?
                            <div className="col-md-12">
                                <div className="form-group  pull-right">
                                    <button className="btn btn-sm" disabled={!this.state.title} onClick={this.onSave}>Add Criteria</button>
                                </div>
                            </div>
                        :
                        <div>
                            { (this.state.title || this.state.title!==this.props.criteria.title
                                || this.state.weight!==this.props.criteria.weight)?
                            <div className="col-md-12">
                                <ul className=" form-group list-inline pull-right">
                                    <li>
                                        <button className="btn btn-sm"
                                            onClick={this.onCancel}>Cancel
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            :null
                            }
                            { this.props.criteria.questions.map(item =>
                                <Question key={item} criteriaId={this.props.criteria.id} questionId={item}/>
                            ) }
                            {
                                this.props.criteria.questions.length?
                                <div className="col-md-12 mar-btm">
                                    <button className="btn btn-sm"
                                        onClick={() => this.setState({ showAdd: !this.state.showAdd })}>
                                        Add Question</button>
                                        {
                                            this.state.showAdd?
                                                <Question criteriaId={this.props.criteria.id} question={this.state.newQuestion}/>
                                                :null
                                            }
                                </div>
                                :
                                <Question criteriaId={this.props.criteria.id} question={this.state.newQuestion}/>
                            }
                        </div>
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                            <div>{title}</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">weight*</span></label>
                            <div>{weight}</div>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <ul className="list-inline pull-right">
                        <li>
                            <button className="btn btn-sm"  onClick={() => this.setState({ isMaximised:!this.state.isMaximised })}>Edit</button>
                        </li>
                        <li>
                            <button className="btn btn-sm" onClick={this.onDelete}>Delete</button>
                        </li>
                    </ul>
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
