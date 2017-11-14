import React, { PropTypes,  Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { QUESTION_TYPES, QUESTION_OPTIONS } from '../constants/models';
import { getItemByAttrib, createQuestion } from '../utils/dataParserUtil';
import { deepClone } from '../utils/dataParserUtil';
import { addQuestionToCriteria as add  } from '../actions/evaluationTemplateCreator';
class Question extends Component {

    constructor(props) {
        super(props);
        const question = this.props.question;
        this.state = {
            isMaximised: question.isMaximised,
            title: question.title,
            isAllowUpload: question.isAllowUpload,
            isCommentRequired: question.isCommentRequired,
            isAllowScaleDefinitions: question.isAllowScaleDefinitions,
            typeId: question.typeId,
            scaleDefinitions: question.scaleDefinitions
        };
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion() {
        this.props.dispatch(add(this.props.criteriaId, this.state.title, this.state.typeId));
    }
    onCommentRequiredChange(value) {
        this.setState({ isCommentRequired: value });
    }
    onAllowUploadChange(value) {
        this.setState({ isAllowUpload:value });
    }
    onAllowScaleDefinitionChange(value) {
        this.setState({ isAllowScaleDefinitions:value });
        let scaleDefinitions = [];
        if (value) {
            const optionsLength = getItemByAttrib(QUESTION_TYPES, 'type', this.state.typeId).maxOptionDefinitions;
            if (this.state. typeId === this.props.question.typeId) {
                scaleDefinitions = deepClone(this.props.question.scaleDefinitions);
                if (scaleDefinitions.length<optionsLength) {
                    for (let i = scaleDefinitions.length+1; i <= optionsLength; i++) {
                        scaleDefinitions.push({ id:i, label:'' });
                    }
                }
            } else {
                for (let i=1; i<=optionsLength; i++) {
                    scaleDefinitions.push({ id:i, label:'' });
                }
            }
        }
        this.setState({ scaleDefinitions });
    }
    onDiscardChanges() {
        const question = this.props.question;
        this.setState({
            isMaximised:false,
            title: question.title,
            isAllowUpload:question.isAllowUpload,
            isCommentRequired:question.isisCommentRequired,
            isAllowScaleDefinitions: question.isAllowScaleDefinitions,
            typeId: question.typeId,
            scaleDefinitions: question.scaleDefinitions
        });
    }
    render() {
        return this.state.isMaximised? this.renderMaximised():this.renderMinimised();
    }
    renderMinimised() {
        return (
            <div className="col-md-12">
                <div className="form-group">
                    <label>{ getItemByAttrib(QUESTION_TYPES, 'type', this.state.typeId).label}</label>
                    <p>{this.state.title}</p>
                    <button onClick={ () => this.setState({ isMaximised:true })}>Edit</button><button>Delete</button>
                </div>
            </div>
        );
    }
    renderMaximised() {
        return (<div className="col-md-12">
            <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label">
                        <span className="required" aria-required="true">Question Type</span>
                    </label>
                    <select className="form-control" value={this.state.typeId}
                        onChange={event =>  this.setState({ typeId:event.target.value })}>
                        {QUESTION_TYPES.map((item, index) => <option key={index} value={item.type}>{item.label }</option>)}
                </select>
                </div>
            </div>
            <div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label"><span className="required" aria-required="true">Question Title</span></label>
                        <textarea className="form-control" value={this.state.title} onChange={event => this.setState({ title:event.target.value })}></textarea>
                    </div>
                </div>
                {
                    this.props.question.id!==null?
                    <div>
                        <div className="col-md-12">
                            <ul>
                                <li><div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" disabled = {this.state.scaleDefinitions}
                                                defaultChecked={this.props.question.isAllowScaleDefinitions}
                                                value={this.state.isAllowScaleDefinitions}
                                                onClick={ event => this.onAllowScaleDefinitionChange(event.target.checked)}/>
                                            {QUESTION_OPTIONS[0].label}
                                        </label>
                                        {this.state.isAllowScaleDefinitions?
                                            <ul>
                                                {this.state.scaleDefinitions.map((item, index) =>
                                                    <li key={index} className="mar-btm-sm">
                                                        <span className="badge">{item.id}</span>
                                                        <input type="text" value={item.label} className="mar-l-sm" />
                                                    </li>)}
                                            </ul>
                                        :null}
                                    </div>
                                </div>
                                </li>
                                <li><div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                defaultChecked={this.props.question.isAllowUpload}
                                                value={this.state.isAllowUpload}
                                                onClick={ event => this.onAllowUploadChange(event.target.checked) }
                                            />
                                            {QUESTION_OPTIONS[1].label}
                                        </label>
                                    </div>
                                </div>
                                </li>
                                <li><div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                defaultChecked = {this.props.question.isCommentRequired}
                                                value = {this.state.isCommentRequired}
                                                onClick = { event => this.onCommentRequiredChange(event.target.checked) }/>
                                                {QUESTION_OPTIONS[2].label}
                                            </label>
                                    </div>
                                </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label">Documents</label>
                                <Dropzone className="dropzone">
                                    <p className="text-center dropzone__placeholder">
                                        <i className="fa fa-cloud-upload"></i> Drop files here or click to select files.
                                    </p>
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            {this.renderFunctionButtons()}
        </div>);
    }
    renderFunctionButtons() {
        if (this.props.question.id===null) {
            return (
                    <div className="col-md-12">
                        <div className="form-group pull-right">
                            <button className="btn btn-sm" disabled={!this.state.title} onClick={this.addQuestion}>Add Question</button>
                        </div>
                    </div>
            );
        } else {
            return (
                    <div className="col-md-12">
                    <div className="form-group">
                        <ul className="list-inline pull-right">
                            <li><button className="btn btn-sm">Save Question</button></li>
                            <li><button className="btn btn-sm" onClick={ () => this.onDiscardChanges()}>Discard Changes</button></li>
                            </ul>
                    </div>
                </div>
            );
        }
    }
}

Question.propTypes = {
    question: PropTypes.object,
    questionId: PropTypes.string,
    criteriaId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    const { questionsByIndex } = state.evaluationTemplateCreator;
    let question = props.questionId ? questionsByIndex[props.questionId]: createQuestion();
    return { question };
}

export default connect(mapStateToProps)(Question);
